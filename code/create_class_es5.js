// https://juejin.im/post/5c22ed89e51d45779a0be828
/**
 * Every object has _proto_
 * only instance's prototype has protoytpe object
 */
/**
 * 校验本身是否直接引用
 * 对props进行属性定义 writable、enumerable、configurable
 * 将静态方法 与 非静态方法进行分别处理
 */

// 实例化检测
hasConstructorableAble = (instance, prototype) => {
  if (!(instance instanceof prototype)) {
    throw Error("constructor has been constucted!");
  }
};

// 将属性划分static 与 props挂入原型
function CreateClass(target, props) {

  if (!props || !Array.isArray(props)) {
    props = [];
  }

  for (var i = 0; i < props.length; i++) {
    var propItem = props[i];
    if ("value" in propItem) {
      propItem.writable = true;
    }
    propItem.enumerable = propItem.enumerable || false;
    propItem.configurable = true;
    if (propItem.type === "static") {
      Object.defineProperty(target, propItem.key, propItem);
    } else {
      Object.defineProperty(target.prototype, propItem.key, propItem);
    }
  }
  return target;
}

var NewClass = (function() {
  function InitClass(props) {
    hasConstructorableAble(this, InitClass);
    this.name = props
  }
  CreateClass(InitClass, [
    {
      type: "props",
      key: "hello",
      value: () => {}
    },
    {
      type: "static",
      key: "test",
      value: () => {}
    }
  ]);
  return InitClass
})();
