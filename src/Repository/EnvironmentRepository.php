<?php

namespace App\Repository;

use App\Entity\Environment;
use App\Entity\Factors;
use App\Entity\Provinces;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Environment>
 *
 * @method Environment|null find($id, $lockMode = null, $lockVersion = null)
 * @method Environment|null findOneBy(array $criteria, array $orderBy = null)
 * @method Environment[]    findAll()
 * @method Environment[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EnvironmentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Environment::class);
    }

    public function getYear() : array {
        $query = $this->createQueryBuilder('p')
            ->select('p.year')
            ->groupBy('p.year');

        return $query->orderBy('p.year','ASC')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Environment[]
     */
    public function findByProvinceAndYear(?Provinces $provinces, ?string $year): array
    {
        $query = $this->createQueryBuilder('p');
        if ($provinces){
            $query->andWhere('p.province = :province')
                ->setParameter('province',$provinces);
        }
        if ($year){
            $query->andWhere('p.year = :year')
                ->setParameter('year',$year);
        }
        return $query->getQuery()->getResult();
    }

    /**
     * @return Environment[]
     */
    public function orderByProvince(?Provinces $provinces, ?Factors $factor): array
    {
        $query = $this->createQueryBuilder('p')
            ->leftJoin('p.province','c');
        if ($provinces){
            $query->andWhere('p.province = :province')
                ->setParameter('province',$provinces);
        }
        if ($factor) {
            $query->andWhere('p.factor = :factor')
                ->setParameter('factor',$factor);
        }
        return $query
            ->andWhere('p.isEnabled = :isEnabled')
            ->setParameter('isEnabled',1)
            ->orderBy('c.provinceName', 'ASC')
            ->addOrderBy('p.year','ASC')
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return Environment[] Returns an array of Environment objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Environment
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
