(function($) {
  $(document).on('crmLoad', '#civicrm-menu', function() {
    if (CRM.vars && CRM.vars.recentmenu && !CRM.menubar.getItem('recent_items')) {
      CRM.menubar.addItems(-1, null, [CRM.vars.recentmenu]);
    }
  });
})(CRM.$);
