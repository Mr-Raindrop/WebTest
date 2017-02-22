//  事件绑定
function addEventHandler(ele, event, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(event, handler, false);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + event, handler);
  } else {
    ele["on" + event] = handler;
  }
}
//  创建类；
var createTag = (function() {
  function _tag(input, output, button) {
    // 私有变量
    var number;
    // 特权方法
    this.getNumber = function() {
      return number;
    };
    this.setNumber = function(newNumber) {
      number = newNumber;
    };
    // 公有属性
    this.input = document.getElementById(input);
    this.output = document.getElementsByClassName(output)[0];
    this.button = document.getElementById(button);
    // 公有方法
    this.getData = function() {
       

    };
    this.render = function(value) {
        if (value === '' || value === ',' || value === '，') {
          return;
        }
        var wrap = document.createElement("div");
        wrap.textContent = value;
        this.output.appendChild(wrap);
        number++;
      };
      


  }
  _tag.prototype = {
    // 检测数据是否有重复
    repeatData: function(data) {
      for (var i = 0; i < this.output.children.length; i++) {
        if (this.output.children[i].textContent.localeCompare(data) === 0) {
          this.value = "";
          this.setNumber(this.output.children.length);
          return true;
        }
      }
    },
    //删除特定数据
    delData: function(ele) {
      this.output.removeChild(ele);
      this.setNumber(this.output.children.length)
    },
    //事件绑定
    init: function() {
      var self = this;
      addEventHandelr(this.button,"click",function (){alert("helloworld")})
      addEventHandler(this.output, "mouseover", function(event) {
        event.target.textContent = "删除：" + event.target.textContent;
      });
      addEventHandler(this.output, "mouseout", function(event) {
        event.target.textContent = event.target.textContent.replace(/删除：/, "");

      });
      addEventHandler(this.output, "click", function(event) {
        this.delData(event.target);
      });
    }
  };
  return _tag;
})();
// var tag = new createTag('tag','tagContainer');
var hobby = new createTag('hobby', 'hobbyContainer', 'confirm');
