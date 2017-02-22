var btn=document.getElementsByTagName("input"),
prebtn=btn[0],
inbtn=btn[1],
postbtn=btn[2];
var Parent=document.getElementById("parent");
var divList=[];
var timer=null;
window.onload=function(){
  prebtn.onclick=function(){
    reset();
    preOrder(Parent);
    changeColor();
  };
    inbtn.onclick=function(){
    reset();
    inOrder(Parent);
    changeColor();
  };
    postbtn.onclick=function(){
    reset();
    postOrder(Parent);
    changeColor();
  };
};
// 这里的循环遍历很神奇
function preOrder(node){
  if(!(node===null)){
    divList.push(node);
    preOrder(node.firstElementChild);
    preOrder(node.lastElementChild);
  }
};
function inOrder(node){
  if(!(node===null)){
    inOrder(node.firstElementChild);
    divList.push(node);
    inOrder(node.lastElementChild);
  }
}
function postOrder(node){
  if(!(node===null)){
    postOrder(node.firstElementChild);
    postOrder(node.lastElementChild);
    divList.push(node);
  }
}
// 注意backgroundColor
function changeColor(){
  var i=0;
  divList[i].style.backgroundColor = 'blue'
  timer=setInterval(function(){
    i++;
    if(i<divList.length){
      divList[i-1].style.backgroundColor="#fff";
      divList[i].style.backgroundColor="blue";
    }
    else{
      clearInterval(timer);
      divList[divList.length-1].style.backgroundColor="#fff";
    }

  },500);
}
// 把divList置空，并且重新遍历div元素，使所有元素背景颜色重置
function reset(){
  divList=[];
  clearInterval(timer);
  var divs=document.getElementsByTagName("div");
  for(var i=0;i<divs.length;i++){
    divs[i].style.backgroundColor="#fff";
  }
}