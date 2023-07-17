<?php
use CRM_Recentmenu_ExtensionUtil as E;

$menuItems = [];
$domains = \Civi\Api4\Domain::get(FALSE)
  ->addSelect('id')
  ->execute();
foreach ($domains as $domain) {
  $menuItems[] = [
    'name' => 'Navigation_recent_items_domain_' . $domain['id'],
    'entity' => 'Navigation',
    'cleanup' => 'always',
    'update' => 'unmodified',
    'params' => [
      'version' => 4,
      'values' => [
        'label' => E::ts('Recent'),
        'name' => 'recent_items',
        'url' => NULL,
        'icon' => 'crm-i fa-history',
        'permission' => ['access CiviCRM'],
        'permission_operator' => '',
        'is_active' => TRUE,
        'has_separator' => NULL,
        'parent_id' => NULL,
        'domain_id' => $domain['id'],
      ],
    ],
  ];
}
return $menuItems;
