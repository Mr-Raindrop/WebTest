// 事件绑定函数，兼容各种浏览器；
function addEventHandler(ele, event, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(event, handler, false)
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + event, handler)
  } else {
    ele["on" + event] = handler
  }

}

function each(arr, fn) {
  for (var cur = 0; cur < arr.length; cur++) {
    fn(arr[cur], cur);
  }
}

window.onload = function() {
  var container = document.getElementById("container");
  var buttonList = document.getElementsByTagName("input");
  //  定义队列的对象

  var queue = {
    str: [],
    // 左侧入
    leftpush: function(num) {
      this.str.unshift(num);
      this.paint();
    },
    //右侧入
    rightpush: function(num) {
      this.str.push(num);
      this.paint();
    },
    //输入为空时
    isEmpty: function() {
      return (this.str.length == 0)
    },
    //左侧弹出
    leftpop: function() {
      if (!isEmpty()) {
        alert(this.str.shift());
        this.paint();
      } else {
        alert("The queue is already empty!")
      }
    },
    // 右侧弹出
    rightpop: function() {
      if (!isEmpty()) {
        alert(this.str.pop());
        this.paint();
      } else {
        alert("The queue is already empty!")
      }

    },
    paint: function() {
      var txt = "";
      each(this.str, function(item) {
        txt += ("<div>" + parseInt(item) + "</div>")

      })
      container.innerHTML = txt;
      // 绑定删除函数
      addDivDleEvent();
    },

    deleteId: function(id) {
      console.log(id);
      this.str.splic(id, 1);
      this.paint();
    }
  }

  function addDivDleEvent() {
    for (var cur = 0; cur < container.children.length; cur++) {
      //注意这是错误的。因为cur始终为子元素集合的长度。应该使用闭包。
      //    addEventHandler(container.children[cur],"click",queue.deleteId(cur))；
      addEventHandler(container.children[cur], "click", (function(cur) {
        return function() {
          return queue.deleteId(cur)
        };
      })(cur))
    }
  }
  //  为每个button绑定事件
  addEventHandler(buttonList[1], "click", function() {
    var input = buttonList[0].value;
    if ((/^[0-9]+$/).test(input)) {
      queue.leftpush(input);
    } else {
      alert("Please enter an interger!")
    }
  })
  addEventHandler(buttonList[2], "click", function() {
    var input = buttonList[0].value;
    if ((/^[0-9]+$/).test(input)) {
      queue.rightpush(input);
    } else {
      alert("Please enter an interger!")
    }
  })
  addEventHandler(buttonList[3], "click", function() {
    queue.leftpop()
  });
  addEventHandler(buttonList[4], "click", function() {
    queue.rightpop()
  });
}