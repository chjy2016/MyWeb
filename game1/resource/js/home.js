window.onload=function(){
			var img_list=document.getElementById('img_list').getElementsByTagName('li');
			var button_list=document.getElementById('button_list').getElementsByTagName('li');
			var imgbroad=document.getElementById('img_list');
			var buttonbroad=document.getElementById('button_list');
			var i=0;
            var interval=setInterval(autoPlay,5000);//自动切换
			function autoPlay(){
				if(i+1<img_list.length){
					img_list[i].className='';
					button_list[i].className='';
					img_list[i+1].className='firstimg';
					button_list[i+1].className='now_img';
					i++;
					//console.log("i+1:"+i);	
				}
				else{
					//console.log("else:"+i);		
					img_list[i].className='';
					button_list[i].className='';
					i=0;
					img_list[i].className='firstimg';
					button_list[i].className='now_img';
				}
			}
			function imgChang(btn){
				var flag;
				for(var x=0;x<button_list.length;x++){
					if(button_list[x]==btn){
						img_list[x].className='firstimg';
						button_list[x].className='now_img';
						flag=x;
					}
					else{
						img_list[x].className='';
						button_list[x].className='';
					}
				}
				i=flag;
				//console.log("flag:"+i);		
			}
			//鼠标接触div
    		imgbroad.onmouseover = function(){
    			/*console.log("悬停");*/
        		clearInterval(interval );//停止
    		}
    		//鼠标离开div
    		imgbroad.onmouseout = function(){
    			/*console.log("离开");*/
        		interval = setInterval(autoPlay, 5000); //重新启动即可
    		}
    		buttonbroad.onclick=function(e){
    			clearInterval(interval);//停止
    			/*console.log(e.target);*/
    			imgChang(e.target);
    		}
		}