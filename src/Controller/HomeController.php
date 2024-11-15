<?php

namespace App\Controller;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Project;

class HomeController extends AbstractController
{

    //    #[Route('/', name: 'app_home_blank')]
    //    public function indexBlank(): JsonResponse
    //    {
    //        return new JsonResponse();
    //    }

    #[Route('/page/{reactRouting}', name: 'app_home', defaults: ['reactRouting' => null], priority: -1)]
    public function index(): Response
    {
        return $this->render('react/index.html.twig');
    }

    #[Route('/page/{reactRouting}/{reactSubRouting}', name: 'app_home_sub', defaults: ['reactRouting' => null], priority: -1)]
    public function subIndex(): Response
    {
        return $this->render('react/index.html.twig');
    }
}
