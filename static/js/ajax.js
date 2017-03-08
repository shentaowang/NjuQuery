 (function() {

     //兼容性
     var EventUtil = {
         addHandler: function(element, type, handler) {
             if (element.addEventListener) {
                 element.addEventListener(type, handler, false);
             } else if (element.attachEvent) {
                 element.attachEvent("on" + type, handler);
             } else {
                 element["on" + type] = handler;
             }
         }
     };
     //dom操作
     var morphSearch = document.getElementById('morphsearch'),
         input = morphSearch.querySelector('input.morphsearch-input'),
         btn = document.getElementById("btn"),
         searchResult = document.getElementById('searchResult'),
         b;
    //背景色的变换
     EventUtil.addHandler(input, 'focus', function() {
         if (this.value == 'Search...') {
             this.value = '';
             this.style.color = '#333';
             this.style.backgroundColor = '#fff';
             document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

         }
     })
     EventUtil.addHandler(input, 'blur', function() {
         if (this.value == '') {
             this.value = 'Search...';
             this.style.color = 'rgb(204, 204, 204)';
             this.style.backgroundColor = '#f1f1f1';
             document.body.style.backgroundColor = '#b3a2a2';
         }
     })
     //后台查询
     var search = function() {
         document.body.style.backgroundColor = '#737070';
         var query = $('#searchtext').val();
         if (input.value !== '' && input.value !== "Search...") {
             searchResult.setAttribute("class","searchResult open");
         }

         $.ajax({
             url: '/test',
             dataType: 'JSON',
             type: 'GET',
             data: {
                 query: query,
             },
             success: function(data) {
                 b = data;
                 $("#content").empty();
                 for (var i = 0; i < 10; i++) {
                     var item = '';
                     item += '<h2>';
                     item += data.data[i].title;
                     item += '</h2><a class="dummy-media-object" target="_blank" href="';
                     item += data.data[i].url;
                     item += '"><h3>';
                     item += data.data[i].content;
                     item += '</h3></a>';
                     $("#content").append(item);
                 }
                 $("#page_nav").css("display", "block");
                 var con = document.getElementsByTagName("h3");
                 for (var j = 0; j < con.length; j++) {
                     if (con[j].innerHTML.length > 150) {
                         var conh = con[j].innerHTML.slice(0, 150) + '...';
                         con[j].innerHTML = conh;
                     }
                 }
             }
         });
     }
     //enter键添加搜索功能
     EventUtil.addHandler(input, 'keydown', function(e) {
         var keyCode = e.keycode || e.which;

         if (keyCode === 13) {
            search();
            //阻止事件默认行为
            e.preventDefault();
         }
     })
     EventUtil.addHandler(btn, "click",search);
     // $("#prev,#next").mouseover(function() {
     //     $(this).css("background-color", "#c40");
     // });

     // $("#prev,#next").mouseleave(function() {
     //     $(this).css("background-color", "#069");
     // });
     //每次翻页向服务器请求数据
     // $("#prev,#next").bind("click", function(event) {
     //     event.preventDefault();
     //     var pn = $(this).attr("pn");
     //     var query = $('#searchtext').val();
     //     var tmp1 = parseInt(pn) - 1;
     //     var tmp2 = parseInt(pn) + 1;
     //     $.ajax({
     //         url: '/test',
     //         dataType: 'JSON',
     //         type: 'GET',
     //         data: {
     //             query: query,
     //         },
     //         success: function(data) {
     //             var j = (pn - 1) * 10;
     //             $("#content").empty();
     //             for (i = j; i < j + 10; i++) {
     //                 var item = '';
     //                 item += '<h2>';
     //                 item += data.data[i].title;
     //                 item += '</h2><a class="dummy-media-object" target="_blank" href="';
     //                 item += data.data[i].url;
     //                 item += '"><h3>';
     //                 item += data.data[i].content;
     //                 item += '</h3></a>';
     //                 $("#content").append(item);
     //             }
     //             $("html,body").animate({
     //                 scrollTop: 0
     //             }, 500);
     //             var con = document.getElementsByTagName("h3");
     //             for (var j = 0; j < con.length; j++) {
     //                 if (con[j].innerHTML.length > 150) {
     //                     var conh = con[j].innerHTML.slice(0, 150) + '...';
     //                     con[j].innerHTML = conh;
     //                 }
     //             }
     //             var num, p, last;
     //             num = data.data.length;
     //             last = num % 10;
     //             p = num < 10 ? 0 : Math.ceil(num / 10);
     //             $('#curpage').text(pn);
     //             ppn = Math.max(tmp1, 1);
     //             npn = Math.min(tmp2, p);
     //             $('#prev').attr("pn", ppn);
     //             $('#next').attr("pn", npn);
     //         }
     //     });
     // });

     //一次请求保存查询结果实现翻页
     $("#prev,#next").bind("click", function(event) {
         event.preventDefault();
         var pn = parseInt($(this).attr("pn"));
         var query = $('#searchtext').val();
         var tmp1 = parseInt(pn) - 1;
         var tmp2 = parseInt(pn) + 1;
         var data = b;
         var num, p, last;
         num = data.data.length;
         last = num % 10;
         p = num < 10 ? 0 : Math.ceil(num / 10);
         var j = (pn - 1) * 10;
         $("#content").empty();
         //判断最后一页条数 避免undefine
         if (pn === p) {
             if (last === 0) {
                 last = last + 10;
             }
             for (var i = j; i < j + last; i++) {
                 var item = '';
                 item += '<h2>';
                 item += data.data[i].title;
                 item += '</h2><a class="dummy-media-object" target="_blank" href="';
                 item += data.data[i].url;
                 item += '"><h3>';
                 item += data.data[i].content;
                 item += '</h3></a>';
                 $("#content").append(item);
             }
         } else {
             for (var k = j; k < j + 10; k++) {
                 var item2 = '';
                 item2 += '<h2>';
                 item2 += data.data[k].title;
                 item2 += '</h2><a class="dummy-media-object" target="_blank" href="';
                 item2 += data.data[k].url;
                 item2 += '"><h3>';
                 item2 += data.data[k].content;
                 item2 += '</h3></a>';
                 $("#content").append(item2);
             }
         }
         var con = document.getElementsByTagName("h3");
         for (var m = 0; m < con.length; m++) {
             if (con[m].innerHTML.length > 150) {
                 var conh = con[m].innerHTML.slice(0, 150) + '...';
                 con[m].innerHTML = conh;
             }
         }
         $("html,body").animate({
             scrollTop: 0
         }, 500);
         $('#curpage').text(pn);
         ppn = Math.max(tmp1, 1);
         npn = Math.min(tmp2, p);
         $('#prev').attr("pn", ppn);
         $('#next').attr("pn", npn);
     });
 })();
