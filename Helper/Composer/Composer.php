<?php

namespace Linotype\Helper\Composer;

use Linotype\Bundle\LinotypeBundle\Core\Linotype;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class Composer extends AbstractController
{

    public function __construct( Linotype $linotype ){
        $this->linotype = $linotype;
    }

    public function getItems( $items = '[]' )
    {   
        if ( ! $items ) return []; 

        $blocks = [];

        $items = json_decode( $items, true );

        foreach( $items as $item ) {
            
            $context = [];
            if ( isset( $item['context'] ) && $item['context'] ) {
                foreach ( $item['context'] as $context_key => $context_data ) {
                    $context[$context_key] = isset( $context_data['value'] ) ? $context_data['value'] : '';
                    if( is_array( $context[$context_key] ) ) $context[$context_key] = json_encode( $context[$context_key] );
                }
            }
            $blocks[] = [
                'block' => $item['block'],
                'context' => $context
            ];
        }
        return $blocks;
    }

    public function getFields( $items = '[]' )
    {   
        if ( ! $items ) return []; 

        $blocks = [];

        $items = json_decode( $items, true );

        foreach( $items as $item ) {
            $blocks[] = $item;
        }
        return $blocks;
    }

}