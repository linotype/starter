<?php

namespace Linotype\Helper\Query;

use Linotype\Bundle\LinotypeBundle\Core\Linotype;
use Linotype\Bundle\LinotypeBundle\Repository\LinotypeMetaRepository;
use Linotype\Bundle\LinotypeBundle\Repository\LinotypeTemplateRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class Query extends AbstractController
{

    public function __construct( Linotype $linotype, LinotypeTemplateRepository $templateRepo, LinotypeMetaRepository $metaRepo ){
        $this->linotype = $linotype;
        $this->config = $this->linotype->getConfig();
        $this->current = $this->config->getCurrent();
        $this->theme = $this->current->getTheme();
        $this->map = $this->theme ? $this->theme->getMap() : [];
        $this->blocks = $this->config->getBlocks();
        $this->templates = $this->config->getTemplates();
        $this->templateRepo = $templateRepo;
    }

    public function getTemplates( $context = [] )
    {
        $templates = [];

        $template_ids = $this->templateRepo->findBy(['template_key' => $context['id'] ]);
        
        if ( $template_ids ){
            foreach( $template_ids as $template ) {

                $templateObject = $this->templates->findById( $this->map[ $template->getTemplateKey() ]['template'] );
                $blocks = $this->current->render( $templateObject, $template->getId() );
                $templates[ $template->getId() ] = [
                    'id' => $template->getId(),
                    'link' => str_replace('{id}', $template->getId(), $this->map[ $template->getTemplateKey() ]['path'] ),
                    'admin' => '',
                    'data' => [],
                ];
                foreach( $blocks as $block ) {
                    $templates[ $template->getId() ]['data'][ $block->getKey() ] = [];
                    foreach( $block->getContext()->getAll() as $context ) {
                        $templates[ $template->getId() ]['data'][ $block->getKey() ][ $context->getId() ] = $context->getValue();
                    }
                }

            }
        }

        return $templates;
    
    }

}