 (function() {
     var morphSearch = document.getElementById('morphsearch'),
         input = morphSearch.querySelector('input.morphsearch-input'),
         ctrlClose = morphSearch.querySelector('span.morphsearch-close'),
         isOpen = isAnimating = false,
         // show/hide search area
         toggleSearch = function(evt) {
             // return if open and the input gets focused
             if (evt.type.toLowerCase() === 'focus' && isOpen) return false;

             var offsets = morphsearch.getBoundingClientRect();
             if (isOpen) {
                 classie.remove(morphSearch, 'open');

                 // trick to hide input text once the search overlay closes 
                 // todo: hardcoded times, should be done after transition ends
                 if (input.value !== '') {
                     setTimeout(function() {
                         classie.add(morphSearch, 'hideInput');
                         setTimeout(function() {
                             classie.remove(morphSearch, 'hideInput');
                             input.value = '';
                         }, 300);
                     }, 500);
                 }

                 input.blur();
             } else {
                 classie.add(morphSearch, 'open');
             }
             isOpen = !isOpen;
         };

     // events
     input.addEventListener('focus', toggleSearch);
     ctrlClose.addEventListener('click', toggleSearch);

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
     var btn = document.getElementById("btn");
     var b;
     EventUtil.addHandler(btn, "click", function() {
         var query = $('#searchtext').val();
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
     });
     $("#prev,#next").mouseover(function() {
         $(this).css("background-color", "#c40");
     });

     $("#prev,#next").mouseleave(function() {
         $(this).css("background-color", "#069");
     });
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