<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SurveyController extends AbstractController
{
    #[Route('/', name: 'app_client')]
    public function client(): Response
    {
        return $this->render('client/index.html.twig');
    }

    // #[Route('/static-data', name: 'static-data')]
    // public function staticData(): Response
    // {
    //     return $this->render('static_data/index.html.twig');
    // }

    // #[Route('/developing-index', name: 'developing-index')]
    // public function developingIndex(): Response
    // {
    //     return $this->render('developing_index/index.html.twig');
    // }

    // #[Route('/analytic-data', name: 'analytic-data')]
    // public function analyticData(): Response
    // {
    //     return $this->render('analytic_data/index.html.twig');
    // }
}
