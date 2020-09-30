import HttpStatus from "http-status-codes";
import _ from "lodash";

export default class Response {
  /**
   * @example extra = {pagination: {offset: 10, limit: 50, rows: 1000}}
   *
   * @static
   * @param {*} res
   * @param {*} message
   * @param {*} [data=null]
   * @param {number} [code=200]
   * @param {*} [extra={}]
   * @memberof Response
   */
  static success(res, message, data = null, code = HttpStatus.OK, extra = {}) {
    const resObj = { success: true };

    if (_.isObjectLike(message)) {
      resObj.message = message.message || "success";
      resObj.data = message.data || null;
      resObj.code = message.code || HttpStatus.OK;
      resObj.extra = message.extra || {};
    } else {
      resObj.message = message || "success";
      resObj.data = data || null;
      resObj.code = code || HttpStatus.OK;
      resObj.extra = extra || {};
    }

    if (resObj.extra.pagination) {
      resObj.extra.pagination.currentPage =
        resObj.extra.pagination.offset / resObj.extra.pagination.limit + 1;
      resObj.extra.pagination.nextPage =
        resObj.extra.pagination.rows >
        resObj.extra.pagination.offset + resObj.extra.pagination.limit
          ? resObj.extra.pagination.currentPage + 1
          : null;
      delete resObj.extra.pagination.offset;
    }

    res.status(resObj.code).json(resObj);
  }

  /**
   * @static
   * @param {*} res
   * @param {*} message
   * @param {number} [code=404]
   * @param {*} [resCode=null]
   * @param {*} [extra={}]
   * @memberof Response
   */
  static fail(
    res,
    message,
    code = HttpStatus.NOT_FOUND,
    resCode = HttpStatus.NOT_FOUND,
    extra = {}
  ) {
    const resObj = { success: false };

    if (_.isObjectLike(message)) {
      resObj.message = message.message || "failed";
      resObj.code = message.code || HttpStatus.NOT_FOUND;
      resObj.resCode = message.resCode || resObj.code;
      resObj.extra = message.extra || {};
    } else {
      resObj.message = message || "failed";
      resObj.code = code || HttpStatus.NOT_FOUND;
      resObj.resCode = resCode || resObj.code;

      if (_.isString(extra)) {
        if (!_.isEmpty(extra)) {
          if (extra.indexOf("Error: ") === 0) {
            this.addErrorStackTrace(resObj, { stack: extra });
          } else {
            resObj.extra = { key: extra };
          }
        } else {
          resObj.extra = {};
        }
      } else if (_.isObjectLike(extra)) {
        if (extra instanceof Error) {
          this.addErrorStackTrace(resObj, extra);
        } else {
          resObj.extra = extra;
        }
      }
    }

    res.status(resObj.code).json(resObj);
  }

  /**
   * @description adding stack trace in response if environment is not prod
   * @static
   * @param {*} obj => response object
   * @param {*} err => error object
   * @memberof Response
   */
  static addErrorStackTrace(obj, err) {
    if (
      !["stage", "prod"].includes(process.env.NODE_ENV) &&
      err &&
      "stack" in err
    ) {
      if (!("extra" in obj)) {
        obj.extra = { stacks: [] };
      } else if (!("stacks" in obj.extra)) {
        obj.extra.stacks = [];
      }

      obj.extra.stacks.push({
        service: process.env.SERVICE_NAME,
        stack: err.stack.split("\n"),
      });
    }
  }

  /**
   * @description create custom error object
   * @static
   * @param {*} type
   * @param {*} [err=null]
   * @returns
   * @memberof Response
   */
  static createError(type, err = null) {
    if (!_.isEmpty(err) && "name" in err && err.name) {
      // If error is generated by this method then returning it immediately
      if (["CustomError"].includes(err.name)) {
        this.addErrorStackTrace(err, err);

        return err;
      }

      // It handles request package errors
      if (
        ["StatusCodeError"].includes(err.name) &&
        "error" in err &&
        _.isObjectLike(err.error)
      ) {
        this.addErrorStackTrace(err.error, err);

        return this.createError(err.error);
      }
    }

    const e = Error(type.message);
    e.code = type.code;

    e.name = type.name || "CustomError";

    if (type.resCode) {
      e.resCode = type.resCode;
    } else {
      e.resCode = type.code;
    }

    if (!_.isEmpty(type.extra)) {
      e.extra = type.extra;
    } else {
      e.extra = {};
    }

    this.addErrorStackTrace(e, err);

    return e;
  }
}
