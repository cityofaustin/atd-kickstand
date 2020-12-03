function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var apolloBoost = require('apollo-boost');

var styles = {"test":"_3ybTi"};

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n      ", "\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["query GetLocationStats {\n      ", "\n    }"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n      ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var GQLAbstract = /*#__PURE__*/function () {
  function GQLAbstract(initConfig) {
    var _this = this;

    this.getExpKey = function (exp) {
      return exp.split(/[{} ]+/, 1)[0].trim();
    };

    this.getExpValue = function (exp) {
      return exp.substring(exp.indexOf("{") + 1, exp.lastIndexOf("}")).trim();
    };

    this.sortifyNestedKey = function (exp, val) {
      return _this.isNestedKey(exp) ? _this.getExpKey(exp) + ": { " + _this.sortifyNestedKey(_this.getExpValue(exp), val) + " }" : exp + ": " + val;
    };

    this.config = initConfig;
    this.configInit = JSON.parse(JSON.stringify(initConfig));
    this.config.filterStack = {
      where: [],
      order_by: []
    };
  }

  var _proto = GQLAbstract.prototype;

  _proto.isNestedKey = function isNestedKey(input) {
    return input.match(/^[0-9a-zA-Z\-_]+$/) === null;
  };

  _proto.cleanWhere = function cleanWhere() {
    this.config.where = null;
    this.config.or = null;
  };

  _proto.clearOrderBy = function clearOrderBy() {
    this.config.order_by = [];
  };

  _proto.resetOrderBy = function resetOrderBy() {
    this.config.order_by = this.configInit.order_by;
  };

  _proto.resetFull = function resetFull() {
    this.config = JSON.parse(JSON.stringify(this.configInit));
  };

  _proto.setWhere = function setWhere(key, syntax) {
    if (!this.config.where) this.config.where = {};
    this.config.where[key] = syntax;
  };

  _proto.setOr = function setOr(key, syntax) {
    if (!this.config.or) this.config.or = {};
    this.config.or[key[0]] = syntax[0];
  };

  _proto.deleteWhere = function deleteWhere(key) {
    delete this.config.where[key];
  };

  _proto.deleteOr = function deleteOr(orObject) {
    var keyToDelete = Object.keys(orObject)[0];
    this.config.or && delete this.config.or[keyToDelete];
  };

  _proto.setOrder = function setOrder(key, syntax) {
    if (this.config && this.config.order_by) {
      this.config.order_by = {};
      this.config.order_by[key] = syntax;
    } else {
      this.config.order_by = {};
      this.config.order_by[key] = syntax;
    }
  };

  _proto.isSortable = function isSortable(columnName) {
    return this.config.columns[columnName].sortable || false;
  };

  _proto.isHidden = function isHidden(columnName) {
    return this.config.columns[columnName].hidden || false;
  };

  _proto.isSearchable = function isSearchable(columnName) {
    return this.config.columns[columnName].searchable || false;
  };

  _proto.isPK = function isPK(columnName) {
    return this.config.columns[columnName].primary_key || false;
  };

  _proto.getType = function getType(columnName) {
    return (this.config.columns[columnName].type || "string").toLowerCase();
  };

  _proto.getDefault = function getDefault(columnName) {
    return this.config.columns[columnName]["default"];
  };

  _proto.getFormattedValue = function getFormattedValue(columnName, value) {
    var type = this.getType(columnName);

    if (value === null) {
      return "-";
    } else {
      value = String(value);
    }

    switch (type) {
      case "string":
        {
          if (typeof value === "object") return JSON.stringify(value);else return "" + value;
        }

      case "date_iso":
        {
          var dateValue = "";

          try {
            dateValue = new Date(Date.parse(value)).toLocaleString();
          } catch (_unused) {
            dateValue = "n/a";
          }

          return "" + dateValue;
        }

      case "currency":
        {
          return "$" + value.toLocaleString();
        }

      case "boolean":
        {
          return value ? "True" : "False";
        }

      default:
        {
          return "" + value;
        }
    }
  };

  _proto.getLabel = function getLabel(columnName, type) {
    if (type === void 0) {
      type = "table";
    }

    return this.config.columns[columnName]["label_" + type] || null;
  };

  _proto.getEntries = function getEntries(section) {
    return Object.entries(this.config[section] || section);
  };

  _proto.generateFilters = function generateFilters(aggregate) {
    if (aggregate === void 0) {
      aggregate = false;
    }

    var output = [];

    if (aggregate === false) {
      if (this.config.limit) {
        output.push("limit: " + this.config.limit);
      }

      if (this.config.offset !== null) {
        output.push("offset: " + this.config.offset);
      }
    }

    if (this.config.where !== null) {
      var where = [];
      var or = [];

      for (var _iterator = _createForOfIteratorHelperLoose(this.getEntries("where")), _step; !(_step = _iterator()).done;) {
        var _step$value = _step.value,
            _key = _step$value[0],
            _value = _step$value[1];

        if (this.isNestedKey(_key)) {
          or.push("{ " + _key + " }");
        } else {
          where.push(_key + ": {" + _value + "}");
        }
      }

      if (this.config.or) {
        for (var _iterator2 = _createForOfIteratorHelperLoose(this.getEntries("or")), _step2; !(_step2 = _iterator2()).done;) {
          var _step2$value = _step2.value,
              key = _step2$value[0],
              value = _step2$value[1];
          or.push("{" + key + ": {" + value + "}}");
        }
      }

      if (or.length > 0) {
        output.push("where: {" + where.join(", ") + ", _or: [" + or.join(", ") + "]}");
      } else {
        output.push("where: {" + where.join(", ") + "}");
      }
    }

    if (this.config.order_by) {
      var orderBy = [];

      for (var _iterator3 = _createForOfIteratorHelperLoose(this.getEntries("order_by")), _step3; !(_step3 = _iterator3()).done;) {
        var _step3$value = _step3.value,
            _key2 = _step3$value[0],
            _value2 = _step3$value[1];
        orderBy.push(this.isNestedKey(_key2) ? this.sortifyNestedKey(_key2, _value2) : _key2 + ": " + _value2);
      }

      output.push("order_by: {" + orderBy.join(", ") + "}");
    }

    return output.join(",\n");
  };

  _proto.generateColumns = function generateColumns() {
    return this.columns.join("\n");
  };

  _proto.loadFilters = function loadFilters(filters, filtersState) {
    for (var group in filters) {
      for (var _iterator4 = _createForOfIteratorHelperLoose(filters[group].filters), _step4; !(_step4 = _iterator4()).done;) {
        var filter = _step4.value;

        for (var _iterator5 = _createForOfIteratorHelperLoose(filter.filter.where), _step5; !(_step5 = _iterator5()).done;) {
          var filterItem = _step5.value;

          for (var _iterator6 = _createForOfIteratorHelperLoose(this.getEntries(filterItem)), _step6; !(_step6 = _iterator6()).done;) {
            var _step6$value = _step6.value,
                key = _step6$value[0],
                syntax = _step6$value[1];

            if (filtersState[filter.id]) {
              key === "or" ? this.setOr(Object.keys(syntax), Object.values(syntax)) : this.setWhere(key, syntax);
            } else {
              key === "or" ? this.deleteOr(syntax) : this.deleteWhere(key);
            }
          }
        }
      }
    }
  };

  _proto.queryCSV = function queryCSV(string) {
    var query = this.abstractStructure;
    this.offset = 0;
    query = query.replace("gqlAbstractTableName", this.config.table);
    query = query.replace("gqlAbstractTableAggregateName", this.config.table + "_aggregate");
    query = query.replace("gqlAbstractFilters", this.generateFilters());
    query = query.replace("gqlAbstractAggregateFilters", this.generateFilters(true));
    query = query.replace("gqlAbstractColumns", string);
    return apolloBoost.gql(_templateObject(), query);
  };

  _proto.queryAggregate = function queryAggregate(queryConfigArray, queryInstance) {
    var _this2 = this;

    var aggregatesQueryArray = [];
    queryConfigArray.forEach(function (config) {
      var query = "\n      gqlAbstractTableAggregateName (\n          gqlAbstractAggregateFilters\n      ) {\n          aggregate {\n            gqlAggregateColumns\n          }\n        }\n      ";
      query = query.replace("gqlAbstractTableAggregateName", config.table);
      var whereFilters = [];
      var orFilters = [];
      Object.entries(queryInstance.config.where).forEach(function (_ref) {
        var filter = _ref[0],
            value = _ref[1];

        if (_this2.isNestedKey(filter)) {
          orFilters.push("{ " + filter + " }");
        } else {
          whereFilters.push(filter + ": { " + value + " }");
        }
      });

      if (queryInstance.config.or) {
        Object.entries(queryInstance.config.or).forEach(function (_ref2) {
          var filter = _ref2[0],
              value = _ref2[1];
          return orFilters.push("{" + filter + ": { " + value + " }}");
        });
      }

      if (orFilters.length > 0) {
        var orString = "_or: [ " + orFilters.join(",") + " ]";
        whereFilters.push(orString);
      }

      query = config.key ? query.replace("gqlAbstractAggregateFilters", "where: { " + config.key + ": { " + whereFilters + " } }") : query.replace("gqlAbstractAggregateFilters", "where: { " + whereFilters + " }");
      query = query.replace("gqlAggregateColumns", config.columns.join(" "));
      aggregatesQueryArray.push(query);
    });
    var aggregatesQueryString = aggregatesQueryArray.join(" ");
    return apolloBoost.gql(_templateObject2(), aggregatesQueryString);
  };

  _proto.setOption = function setOption(optionType, optionsObject) {
    this.config.options[optionType] = optionsObject;
  };

  _proto.getOption = function getOption(optionType) {
    try {
      return this.config.options[optionType];
    } catch (_unused2) {
      return {};
    }
  };

  _createClass(GQLAbstract, [{
    key: "abstractStructure",
    get: function get() {
      return "{\n      gqlAbstractTableName (\n          gqlAbstractFilters\n      ) {\n          gqlAbstractColumns\n      },\n      gqlAbstractTableAggregateName (\n          gqlAbstractAggregateFilters\n      ) {\n        aggregate {\n          count\n        }\n      }\n    }";
    }
  }, {
    key: "table",
    get: function get() {
      return this.config.table;
    },
    set: function set(val) {
      this.config.table = val;
    }
  }, {
    key: "limit",
    set: function set(limit) {
      this.config.limit = limit;
    },
    get: function get() {
      return this.config.limit;
    }
  }, {
    key: "offset",
    set: function set(offset) {
      this.config.offset = offset;
    },
    get: function get() {
      return this.config.offset;
    }
  }, {
    key: "searchableFields",
    get: function get() {
      var columns = [];

      for (var _iterator7 = _createForOfIteratorHelperLoose(this.getEntries("columns")), _step7; !(_step7 = _iterator7()).done;) {
        var _step7$value = _step7.value,
            key = _step7$value[0],
            value = _step7$value[1];
        if (value.searchable) columns.push(key);
      }

      return columns;
    }
  }, {
    key: "columns",
    get: function get() {
      return this.getEntries("columns").map(function (k) {
        return k[0];
      });
    }
  }, {
    key: "singleItem",
    get: function get() {
      return this.config.single_item || null;
    }
  }, {
    key: "showDateRange",
    get: function get() {
      return this.config.showDateRange || false;
    }
  }, {
    key: "query",
    get: function get() {
      var query = this.abstractStructure;
      query = query.replace("gqlAbstractTableName", this.config.table);
      query = query.replace("gqlAbstractTableAggregateName", this.config.table + "_aggregate");
      query = query.replace("gqlAbstractFilters", this.generateFilters());
      query = query.replace("gqlAbstractAggregateFilters", this.generateFilters(true));
      query = query.replace("gqlAbstractColumns", this.generateColumns());
      return query;
    }
  }, {
    key: "useQueryOptions",
    get: function get() {
      return this.getOption("useQuery") || {};
    }
  }, {
    key: "gql",
    get: function get() {
      return apolloBoost.gql(_templateObject3(), this.query);
    }
  }]);

  return GQLAbstract;
}();

var Hi = function Hi(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/React.createElement("h1", {
    style: {
      backgroundColor: data.state === "DARK" ? "black" : "white",
      color: data.state === "DARK" ? "gray" : "black"
    }
  }, "Hi");
};
Hi.propTypes = {};

var ExampleComponent = function ExampleComponent(_ref) {
  var text = _ref.text;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.test
  }, "Example Component: ", text);
};

exports.ExampleComponent = ExampleComponent;
exports.GQLAbstract = GQLAbstract;
exports.Hi = Hi;
//# sourceMappingURL=index.js.map
