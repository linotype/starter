<?php

namespace Linotype\Helper\Menu;

use Linotype\Bundle\LinotypeBundle\Core\Linotype;
use Linotype\Bundle\LinotypeBundle\Repository\LinotypeMetaRepository;
use Linotype\Bundle\LinotypeBundle\Repository\LinotypeTemplateRepository;
use Linotype\Helper\Menu\MenuHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;

class MenuService extends AbstractController
{

    public function __construct( Linotype $linotype, LinotypeTemplateRepository $templateRepo, LinotypeMetaRepository $metaRepo, MenuHelper $helper, RequestStack $request ) {
        $this->locale = $request->getCurrentRequest()->getLocale();
        $this->linotype = $linotype;
        $this->config = $this->linotype->getConfig();
        $this->current = $this->config->getCurrent();
        $this->theme = $this->current->getTheme();
        $this->map = $this->theme ? $this->theme->getMap() : [];
        $this->blocks = $this->config->getBlocks();
        $this->templates = $this->config->getTemplates();
        $this->templateRepo = $templateRepo;
        $this->helper = $helper;
    }

    public function getMenuItems( $context = [] )
    {
        $menu = [];
        foreach( $this->map as $menu_id => $menu_value ) {
            $menu[ $menu_id ] = [
                'name' => $menu_value['name'],
                'path' => ( $this->locale !== 'en' ? '/' . $this->locale : '' ) . $menu_value['path'],
            ];
        }
        return $menu;
    }

}