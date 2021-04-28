<?php

namespace Linotype\Helper\File;

use Linotype\Bundle\LinotypeBundle\Core\Linotype;
use Linotype\Bundle\LinotypeBundle\Repository\LinotypeFileRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class File extends AbstractController
{

    public function __construct( Linotype $linotype, LinotypeFileRepository $fileRepo ){
        $this->linotype = $linotype;
        $this->fileRepo = $fileRepo;
    }

    public function getFile( $context = [] )
    {
        $info = [ 'name'=>'', 'src'=> '' ];

        if ( isset( $context['id'] ) ) {

            $file = $this->fileRepo->find($context['id']);
            
            if ( $file ) {
                $info['name'] = $file->getName();
                $info['src'] = '/uploads/' . $file->getName();    
            }

        }
        
        return $info;
    
    }

}