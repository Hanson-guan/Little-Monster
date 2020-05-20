var boxu = document.getElementsByClassName('boxu')[0];
var list = document.getElementsByClassName('list')[0];
var lis = list.getElementsByTagName('li');
console.log(lis);
boxu.onmousemove = list.onmousemove = function(){
	list.style.display = 'block';
}
boxu.onmouseout = list.onmouseout = function(){
	list.style.display = 'none';
}


	for(var i = 0; i<lis.length; i++){
		lis[i].onclick = function(){
		var a = this.innerHTML;
		boxu.innerHTML = a;
	}
}

function Fname() {
  var age, voteable;
  var min = Number(document.getElementById('iii1').value);
  var max = Number(document.getElementById('iii2').value);
  console.log(typeof(min));
  age = Math.floor(Math.random() * (max - min + 1) ) + min;
  console.log(typeof(age));
  document.getElementById("aaa").innerHTML = age;
  var voteable = (age < 18) ? "好年轻":"够成熟";
    document.getElementById("demo").innerHTML = voteable;
}