(function( $ ){
	var LC={
		name:"ln.calendar",
		version:'1.0',
		type:'month',
	};
	var months=['January','February','March','April','May','June','July','August','September','October','November','December'];
	var weeks=['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];
					
	$.fn.lncalendar = function(options) {
		var options=$.extend(LC,options);
		this.each(function(i, _element){
			var element = $(_element);
			var date=new Date();//默认时间为当天
			var type=options.View.type=LC.type;//设置视图类型
			element.append(options.View.renderView(date));

			//前翻
			$(document).on('click',".header #prev",function(){
				// element.removeClass().addClass(' animated fadeOutLeft');	
				if(type=='month'){					
					date=new Date(date.getFullYear(),date.getMonth()-1,1);
				}else if(type=='week'){
					date=new Date(date.getFullYear(),date.getMonth(),date.getDate()-7);
				}
				element.empty().append(options.View.renderView(date));
				element.removeClass().addClass(' animated fadeInLeft');				
			});
			//后翻
			$(document).on('click',".header #next",function(){
				element.removeClass().addClass(' animated fadeOutRight');	
				if(type=='month'){					
					date=new Date(date.getFullYear(),date.getMonth()+1,1);
				}else if(type=='week'){
					date=new Date(date.getFullYear(),date.getMonth(),date.getDate()+7);
				}
				element.empty().append(options.View.renderView(date));
				element.removeClass().addClass(' animated fadeInRight');
			});
			//今天
			$(document).on('click',".header #today",function(){
				date=new Date();
				element.empty().append(options.View.renderView(date));
			});
			
		});	
		return this;
	};

	//日程表 
	var View=LC.View=({
			language:null,
			type:null,  
			current_time:null,
			initialize:function(date){
				this.current_time=new Date(date);
			},
			renderView:function(date){
				this.initialize(date);
				var view;
	
				if(this.type=='month'){
					view=this.monthView;
				}else if(this.type=='week'){
					view=this.weekView;				
				}
				var contentHtml=view.renderContent(this.current_time);
				var headerHtml=$("<div class='header clearfloat'></div>");
				headerHtml.append("<span id='title' class='left'>"+view.title+"</span>");
				headerHtml.append("<button id='prev' class='left lc-icon lc-icon-left' type='button'></button><button id='next' class='left lc-icon lc-icon-right' type='button'></button><button id='today' class='right' type='button'>Today</button>");
					
				var str=$("<div></div>");
				var popover=$("<div id='popover'></div>");
				popover.append("<div id='arrow'></div><div id='container'></div>").appendTo(contentHtml);

				str.append(headerHtml).append(contentHtml);			

				return str;
			}
		});
	//月历
	var monthView=LC.View.monthView=({
		title:null,
		start:null,
		end:null,
		len:null,	
		month:null,
		year:null,

		initialize:function(current){
			var d=new Date(current);
			var m=d.getMonth();
			var y=d.getFullYear();
			var l=[(new Date(y,m+1,1)).getTime()-(new Date(y,m,1)).getTime()]/(24*3600*1000);
			this.title=months[m]+"&nbsp;"+y;
			this.month=m;
			this.year=y;
			this.start=new Date(y,m,1);
			this.len=l;
			this.end=new Date(y,m,this.len);
		},
		renderContent:function(current){
			this.initialize(current);
			var table=$("<table class='full_wide' id='content'></table>");
			table.append(this.renderThead()).append(this.renderTbody());
			return table;
		},
		renderThead:function(){
			var thead=$("<thead></thead>");
			var th=$("<tr></tr>");
			for(var i=0;i<weeks.length;i++){
				th.append("<th>"+weeks[i]+"</th>");
			}
			thead.append(th);
			return thead;
		},
		renderTbody:function(){
			var start=this.start;
			var len=this.len;
			var sw=start.getDay();	
			var tbody=$("<tbody></tbody>");
			var tr=$("<tr></tr>");

			//月历begin留白
			for(var i=0;i<sw;i++){
				var td="<td><div class='date_div'></div></td>";
				tr.append(td);
			}
			//获取数据
			// var event_data=get_eventData(new Date(start.getFullYear(),start.getMonth(),1),new Date(start.getFullYear(),start.getMonth(),len));
			var  event_data={
				'2016-1-4':[
				{
					start:'09:00',
					end:'09:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				{
					type:1,//1为正式课，0为试听课
					start:'20:00',
					end:'20:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				],
				'2016-1-5':[
				{
					start:'09:00',
					end:'09:35',
					title:'初中一年级春季数学班',
					teacher:'liangna5',
					other:'',
				},
				{
					start:'09:50',
					end:'10:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				{
					start:'14:00',
					end:'14:35',
					title:'初中一年级春季口语继续班',
					teacher:'lily2',
					other:'',
				},
				{
					type:1,//1为正式课，0为试听课
					start:'20:00',
					end:'20:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				],
				'2016-1-9':[
				{
					start:'09:00',
					end:'09:35',
					title:'初中一年级春季数学班',
					teacher:'liangna6',
					other:'',
				},
				{
					start:'19:00',
					end:'19:35',
					title:'初中一年级春季口语继续班',
					teacher:'lily2',
					other:'',
				},
				{
					type:1,//1为正式课，0为试听课
					start:'20:00',
					end:'20:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				],
				'2016-1-30':[
				{
					start:'09:00',
					end:'09:35',
					title:'初中一年级春季数学班',
					teacher:'liangna6',
					other:'',
				},
				{
					type:1,//1为正式课，0为试听课
					start:'20:00',
					end:'20:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				],

			};
			//月历主体
			var count=sw;
			var real_today=new Date();
			for(var j=1;j<=len;j++){
				var td=$("<td></td>");
				var day=new Date(start.getFullYear(),start.getMonth(),j);
				var span=$("<span class='date'></span>");
				span.html(j);
				var date_div=$("<div class='date_div'></div>");

				if(start.getFullYear()==real_today.getFullYear() &&start.getMonth()==real_today.getMonth(0) && j==real_today.getDate()){
					td.addClass('table-highlight');
				}
				
				var key=start.getFullYear()+"-"+(parseInt(start.getMonth())+1)+"-"+j;
				td.append(date_div.append(span));
				if(event_data[key]!=null){
					td.append(this.renderEvent(event_data[key]));
				}
				tr.append(td);
				count++;
				if(count%7==0 && j<len){
					tbody.append(tr.clone(true));
					tr.empty();
				}
			}
			//月历end留白
			var last=7-((len+sw)%7);
			if(last!=7){
				for(var k=count;k<count+last;k++){
					tr.append("<td><div class='date_div'></div></td>");
				}
			}	
			tbody.append(tr.clone(true));		
			return tbody;
		},
		renderEvent:function(data){
			var lc_event=$("<div class='event_list'></div>");
			for(var i=0;i<data.length;i++){
				var ev=$("<span class='event'></span>");

				ev.attr('id',i);
				ev.html(data[i].start+"-"+data[i].end);
				events_detail(ev,data);
				lc_event.append(ev);
			}
			return lc_event;
		}
	});
	//周历
	var weekView=LC.View.weekView=({
		start:null,
		end:null,
		title:null,
		initialize:function(current){
			var d=new Date(current);
			var m=d.getMonth();
			var y=d.getFullYear();
			this.title=months[m]+"&nbsp;"+y;
			this.start=new Date(y,m,(d.getDate()-d.getDay()+1));
			this.end=new Date(y,m,(d.getDate()-d.getDay()+7));
		},
		renderContent:function(current){
			this.initialize(current);
			var ul=$("<ul class='full_wide clearfloat' id='content'></ul>");
			
			var d= this.start;
			var y=d.getFullYear();
			var m=d.getMonth();
			var day=d.getDate();
			var real_today=new Date();

			// var event_data=get_eventData(new Date(y,m,day),new Date(y,m,day+7));
			var  event_data={
				'2016-1-4':[
				{
					start:'09:00',
					end:'09:35',
					title:'初中一年级春季数学班',
					teacher:'liangna4',
					other:'',
				},
				{
					start:'09:50',
					end:'10:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				{
					start:'14:00',
					end:'14:35',
					title:'初中一年级春季口语继续班',
					teacher:'lily2',
					other:'',
				},
				{
					start:'19:00',
					end:'19:35',
					title:'初中一年级春季口语继续班',
					teacher:'lily2',
					other:'',
				},
				{
					type:1,//1为正式课，0为试听课
					start:'20:00',
					end:'20:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				],
				'2016-1-5':[
				{
					start:'09:00',
					end:'09:35',
					title:'初中一年级春季数学班',
					teacher:'liangna5',
					other:'',
				},
				{
					start:'09:50',
					end:'10:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				{
					start:'14:00',
					end:'14:35',
					title:'初中一年级春季口语继续班',
					teacher:'lily2',
					other:'',
				},
				{
					start:'19:00',
					end:'19:35',
					title:'初中一年级春季口语继续班',
					teacher:'lily2',
					other:'',
				},
				{
					type:1,//1为正式课，0为试听课
					start:'20:00',
					end:'20:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				],
				'2016-1-6':[
				{
					start:'09:00',
					end:'09:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				{
					start:'09:50',
					end:'10:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				{
					start:'14:00',
					end:'14:35',
					title:'初中一年级春季口语继续班',
					teacher:'lily2',
					other:'',
				},
				{
					start:'19:00',
					end:'19:35',
					title:'初中一年级春季口语继续班',
					teacher:'lily2',
					other:'',
				},
				{
					type:1,//1为正式课，0为试听课
					start:'20:00',
					end:'20:35',
					title:'初中一年级春季数学班',
					teacher:'liangna',
					other:'',
				},
				]
			};
			for(var i=0;i<7;i++){
				var li=$("<li></li>");

				d=new Date(y,m,day+i);
				var str="<div class='date'>"+this.renderDate(d)+"</div>";
				if(real_today.getFullYear()==y && real_today.getMonth()==m && real_today.getDate()==(day+i)){
					li.addClass("li-highlight").append(str);					
				}else{
					li.append(str);
				}
				var key=y+"-"+(m+1)+"-"+(day+i);
				if(event_data[key]!=null){
					li.append(this.renderEvent(event_data[key]));
				}
				ul.append(li);				
			}
			return ul;
		},
		renderDate:function(d){
			var str="<span class='number'>"+d.getDate()+"</span>"+"<span class='week'>"+weeks[d.getDay()]+"</span>";

			return str;
		},
		renderEvent:function(data){
			var morning=$("<div class='section'></div>");
			var afternoon=$("<div class='section'></div>");
			var evening=$("<div class='section'></div>");
			for(var i=0;i<data.length;i++){
				var t=data[i]; 
				
				var ev=$("<span class='event'></span>");
				ev.attr('id',i);
				ev.html(t.start+"-"+t.end);
				events_detail(ev,data);

				var s=t.start.split(":")[0];
				if(s<12){
					morning.append(ev);
				}else if(s>=12 && s<18){
					afternoon.append(ev);
				}else{
					evening.append(ev);
				}
			}
			var div=$("<div class='event_div'></div>");
			div.append(morning).append(afternoon).append(evening);
			return div;
		},
	});
//events点击事件
function events_detail(ev,data){
	ev.on('click',function(){		
		var e_id=data[this.id];
		popover_content(e_id);	
		popover_position(this);

		$(this).closest("#content").find(".event").removeClass("event-highlight");
		$(this).addClass("event-highlight");
		$("#popover").show();
		
	});
	document.onclick = function (event){     
		var e = event || window.event;  
		var elem = e.srcElement||e.target; 
		
		if(elem.className.indexOf("event")<0){
			if($(elem).closest("#popover").length==0){
				$("#popover").hide(); 
				$("#content").find(".event").removeClass("event-highlight");
			}			
		}
	} 
}
//popover内容
function popover_content(events){
	var title="<h4>"+events.title+"</h4><p>2015.09.14-2016.01.17</p>";
	var label="<label><span class='left'>"+events.teacher+"</span><span class='right'>"+events.start+"-"+events.end+"</span></label>";
	$("#popover #container").empty().append(title).append(label);
	var button=$("<input id='enter_room' class='cloud_button' type='button' value='进入教室' />");
	$("#popover #container").append(button);
}
//popover位置，尺寸
function popover_position(obj){	
	var eve = $(obj);
	var ew=eve.width();
	var e_l = eve.offset().left ;
	var e_t = eve.offset().top;
	
	var pop_h=$("#popover").innerHeight();
	var pop_w=$("#popover").innerWidth();
	var dw=$(document).width();
	var dh=$(document).height();
	var x;
	var y;
	var direction=1;
	var arrow_y;
	var arrow_x;

	var pop_r=dw - e_l - ew;
	var pop_b=dh - e_t ;

	if(pop_r>pop_w && pop_b>pop_h){
		x=e_l+ew;
		y=e_t;
		arrow_x=0; 
		arrow_y=0;
		direction=1;
	}else if(pop_r<=pop_w && pop_b>pop_h){
		x=e_l-pop_w;
		y=e_t;
		arrow_x=pop_w-10; 
		arrow_y=0;
		direction=0;
	}else if(pop_r>pop_w && pop_b<=pop_h){
		x=e_l+ew;
		y=dh- pop_h;
		arrow_x=0; 
		arrow_y=e_t-y;
		direction=1;
	}
	else if(pop_r<=pop_w && pop_b<=pop_h){
		x=e_l-pop_w;
		y=dh- pop_h;
		arrow_x=pop_w-10; 
		arrow_y=e_t-y;
		direction=0;
	}
	$("#popover").css({
		"top": y-20,
		"left": x  
	});
	$("#popover #arrow").css({
		'top':arrow_y+20,
		'left':arrow_x
	});
	if(direction){
		$("#popover #arrow").removeClass("arrow-right").addClass("arrow-left");
	}else{
		$("#popover #arrow").removeClass("arrow-left").addClass("arrow-right"); 
	}
};

//get数据
function get_eventData(start,end){
	$.get('/getDate?startDate='+start+'&endDate='+end,function(data){
		return data;
	},'json');	
}

})( jQuery );
