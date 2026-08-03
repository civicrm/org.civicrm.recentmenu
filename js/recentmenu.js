(function($) {
  $(document)
    .on('crmLoad', '#civicrm-menu', function() {
      if (CRM.vars && CRM.vars.recentmenu) {
        CRM.menubar.updateItem(CRM.vars.recentmenu);
      }
    })
    .ajaxSuccess(function(event, xhr, settings) {
      try {
        if ((!settings.dataType || settings.dataType == 'json') && xhr.responseText) {
          var response = $.parseJSON(xhr.responseText);
          if (typeof(response.recentmenu_items) == 'object') {
            CRM.vars.recentmenu = response.recentmenu_items;
            CRM.menubar.updateItem(response.recentmenu_items);
          }
        }
      }
      // Ignore errors thrown by parseJSON and the menubar
      catch (e) {}
    });

  /**
   * Toggle the Recent Items menu with Ctrl/Cmd + '.
   *
   * Move the menu to the far right of the screen, for usability.
   */
  $(document).on('keydown', function(e) {
    if (e.key === "'" && (e.ctrlKey || e.metaKey) && !e.altKey && CRM.menubar) {
      e.preventDefault();
      const recentItems = '#civicrm-menu li[data-name="recent_items"]';
      const menubarAnchor = document.querySelector(recentItems + ' > a');
      const submenu = document.querySelector(recentItems + ' > ul');
      if (!menubarAnchor || !submenu) {
        return;
      }
      if (!CRM.menubar.isOpen('recent_items')) {
        // Don't use open directly because it pulls focus to the menu.
        $('#civicrm-menu').smartmenus('itemActivate', $(menubarAnchor));
        pinRight(menubarAnchor, submenu);
      }
      else if (submenu.style.position === 'fixed') {
        CRM.menubar.close();
      }
      else {
        // Open but not pinned, pin it.
        pinRight(menubarAnchor, submenu);
      }
    }
  });

  function pinRight(menubarAnchor, submenu) {
    submenu.style.setProperty('position', 'fixed', 'important');
    submenu.style.setProperty('left', 'auto', 'important');
    submenu.style.setProperty('right', '0', 'important');
    submenu.style.setProperty('top', menubarAnchor.getBoundingClientRect().bottom + 'px', 'important');
  }

  function unpin(submenu) {
    ['position', 'left', 'right', 'top'].forEach(function(prop) {
      submenu.style.removeProperty(prop);
    });
  }

  $(document).on('crmLoad', '#civicrm-menu', function() {
    $(this).on('hide.smapi.recentItemsPin', function(e, hidingSubmenu) {
      if (hidingSubmenu?.style.position === 'fixed' && hidingSubmenu.parentNode?.getAttribute('data-name') === 'recent_items') {
        // Wait for closing animation to finish.
        $(hidingSubmenu).promise().done(function() {
          unpin(hidingSubmenu);
        });
      }
    });
  });
})(CRM.$);
