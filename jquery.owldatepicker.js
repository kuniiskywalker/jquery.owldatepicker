(function($) {
    
    var weekDays = {
        0: "日",
        1: "月",
        2: "火",
        3: "水",
        4: "木",
        5: "金",
        6: "土"
    };
    
    function showcalendar(year, month, dayClick) {

        // 日付を指定年月の1日に設定
        var date = new Date(year, month - 1, 1);

        // 月の開始（1日）曜日
        var startWeek = date.getDay();

        // 月の最終日
        var lastDay = new Date(year, month, 0).getDate();
        
        var isEnd = false;

        var $table = $('<table>');
        
        // 曜日
        var $tr = $('<tr>');
        $.each(weekDays, function (k, v) {
            $td = $('<td>', {
                class: 'owldatepicker-week week' + k,
                text: v
            });
            $tr.append($td);
        });
        $table.append($tr);
        
        var day;
        var label;
        
        while (!isEnd) {
            var $tr = $('<tr>');
            var $td;
            for(var i = 0; i < 7; i++) {
                day = '';
                if ((startWeek == i && date.getDate() == 1) || date.getDate() > 1) {
                    day = date.getDate();
                }
                label = '';
                if (day && !isEnd) {
                    label = day;
                }

                if (day == lastDay) {
                    isEnd = true;
                }

                $td = $('<td>');
                if (!label) {
                    $td.text(label);
                } else {
                    (function (day) {
                        var $a = $('<a>', {
                            class: 'owldatepicker-day week' + i,
                            text: day
                        }).click(function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            dayClick.call(e, day);
                        });
                        $td.append($a);
                    }) (label);
                    date.setDate(day + 1);
                }
                $tr.append($td);
            }
            $table.append($tr);
        }
        return $table;
    }
    
    
    $.fn.owldatepicker = function(options){
        //引数を設定する
        var defaults = {
            class: 'owldatepicker',
            date : new Date(),
            dayClick: function () {}
        };
        var setting = $.extend(defaults, options);
        var $calendar;
        
        // 
        var createcalendarContainer = function ($input) {
            var $calendar = $('<div>', {
                class: setting.class
            });

            //
            var $caption = $('<div>', {
                class: 'owldatepicker-caption'
            });
            $calendar.append($caption);
            
            // カレンダー表示部分
            var $inner = $('<div>', {
                class: 'owldatepicker-inner'
            });

            //
            $calendar.changeCal = function (year, month) {
                var $html = showcalendar(year, month, function (day) {
                    day = ("0"+day).slice(-2);
                    month = ("0"+month).slice(-2);
                    setting.dayClick.call($input, year, month, day);
                    removecalendar();
                });
                $inner.html($html);

                $current.html(year + '/' + month);
            };
            $calendar.append($inner);

            // 前月へ移動するボタン
            var $prev = $('<a>', {
                class: 'owldatepicker-caption-prev',
                text: '←'
            }).click(function (e) {
                e.stopPropagation();
                month--;
                if (month < 1) {
                    year--;
                    month = 12;
                }
                $calendar.changeCal(year, month);
            });
            $caption.append($prev);

            var $current = $('<span>', {
                class: 'owldatepicker-caption-current'
            });
            $caption.append($current);

            // 翌月へ移動するボタン
            var $next = $('<a>', {
                class: 'owldatepicker-caption-next',
                text: '→'
            }).click(function (e) {
                e.stopPropagation();
                month++;
                if (month > 12) {
                    year++;
                    month = 1;
                }
                $calendar.changeCal(year, month);
            });
            $caption.append($next);

            return $calendar;
        };
        
        var removecalendar = function () {
            if ($calendar) {
                $calendar.remove();
            }
        };

        //
        var year = setting.date.getFullYear();

        var month = setting.date.getMonth() + 1;
        
        return this.each(function(i){
            var $input = $(this);

            $input.click(function (e) {
                
                e.preventDefault();
                e.stopPropagation();
                
                if ($calendar) {
                    $calendar.remove();
                }

                var top = $(this).offset().top + $(this).height();
                var left = $(this).offset().left;

                //
                $calendar = createcalendarContainer($input);
                $calendar.css({
                    position: "absolute",
                    top: top + "px",
                    left: left + "px"
                });
                
                $calendar.changeCal(year, month, $input);

                $('body').append($calendar);
                
                $(document).one('click', function (e) {
                    e.stopPropagation();
                    removecalendar();
                });
            });
        });
    };

})(jQuery);