<?php

namespace App\Repository;

use App\Entity\Provinces;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Provinces>
 *
 * @method Provinces|null find($id, $lockMode = null, $lockVersion = null)
 * @method Provinces|null findOneBy(array $criteria, array $orderBy = null)
 * @method Provinces[]    findAll()
 * @method Provinces[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProvincesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Provinces::class);
    }

//    /**
//     * @return Provinces[] Returns an array of Provinces objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Provinces
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
