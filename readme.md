# 試しにつくったカレンダーで日付選ぶjqueryプラグイン
```
<link rel="stylesheet" href="/admin/css/owldatepicker.css" type="text/css" media="all" />
<script src="/admin/js/jquery.owldatepicker.js"></script>
<script>
  $('.datepicker').owldatepicker({
      dayClick: function (year, month, day) {
          var date = year + '-' + month + '-' + day;
          $(this).val(date);
      }
  });
</script>
```
