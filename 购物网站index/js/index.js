window.onload=function(){
    //1.获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    //2.鼠标经过/离开focus,显示/隐藏左右按钮,停止/开始计时器;
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })

    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            //手动调用点击事件
            arrow_r.click();
        },2000)
    })
    //3.动态生成小圆圈,几张图片就有几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    for(var i= 0;i<ul.children.length;i++){
        //创建一个小li
        var li =document.createElement('li'); 
        //并通过自定义属性记录li的索引号
        li.setAttribute('index',i); 
        //然后插入ol里面
        ol.appendChild(li);
        //4.小圆圈排他思想,先同时给li绑定点击事件
        li.addEventListener('click',function(){
            //先去除其他li的类型
            for(var i = 0; i < ol.children.length; i++){
                ol.children[i].className = "";
            }
            //留下当前的li的类型
            this.className = 'current';
            //5.点击小圆圈移动图片,移动的是ul,距离为 -小圆圈索引号*图片宽度
            var index = this.getAttribute('index');   
            //当我们点击某个li时,把li的索引号给num
            num = index;    
            //当我们点击某个li时,把li的索引号给circle
            circle = index;
            animate(ul,-index * focusWidth);
        })
    }
    //把ol里面的第一个小li设置类名为current,底色为白(CSS中)
    ol.children[0].className = 'current';
    //6.克隆第一张图片放到最后(因为之前已经生成小圆圈,所以此时不会再增加)
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //7.点击右侧按钮,图片滚动一张,利用num计数,距离为 -num*图片宽度
    var num = 0;
    var circle = 0;  //控制小圆圈播放
    var flag = true;  //控制节流阀,使动画执行完毕后点击才生效
    //9.右侧按钮做法
    arrow_r.addEventListener('click',function(){
        if(flag){
            flag = false;  //关闭节流阀
            //如果走到最后复制的第一张图片,此时ul要快速复原,left改为0 (无缝滚动效果)
            if(num == ul.children.length-1){
                ul.style.left= 0 ;
                num = 0;
            }
            num++;
            animate(ul,- num * focusWidth,function(){
                flag = true; //打开节流阀
            });
            circle++;
            //如果circle==4(ol.children.length),说明走到最后克隆的图片,此时复原
            if(circle==ol.children.length){
                circle=0;
            }
            //先清除其他小圆圈的class,再留下当前的class
            circleChange(); 

            }
    })
    //9.左侧按钮做法
    arrow_l.addEventListener('click',function(){
        if(flag){
            flag = false;  //关闭节流阀
            if(num == 0){ //如果在第一张图片
                num = ul.children.length-1;  //num变为最后一张复制的num
                ul.style.left= -num * focusWidth + 'px';    //ul位置变为最后一张复制的    
            }
            num--;
            animate(ul,- num * focusWidth,function(){
                flag = true; //打开节流阀
            });
            circle--;
            //如果circle<0 说明在第一张图片点击后,则要改为第四个小圆圈
            if(circle < 0){
                circle = ol.children.length-1;
            }
            //先清除其他小圆圈的class,再留下当前的class
            circleChange();        
        }
        //如果走到第一张图片,此时ul要快速到最后一张复制的图片,left (ul.children.length-1) * focus.focusWidth (无缝滚动效果)

    })

    function circleChange(){  
        //先清除其他小圆圈的class,再留下当前的class
        for(var i = 0;i < ol.children.length;i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //10.自动播放功能(相当于定时点击右侧按钮)
    var timer = setInterval(function(){
        //手动调用点击事件
        arrow_r.click();
    },2000)


}

