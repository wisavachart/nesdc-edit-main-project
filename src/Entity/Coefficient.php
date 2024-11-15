<?php

namespace App\Entity;

use App\Repository\CoefficientRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CoefficientRepository::class)]
class Coefficient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?float $b0 = null;

    #[ORM\Column(nullable: true)]
    private ?float $b1 = null;

    #[ORM\Column(nullable: true)]
    private ?float $b2 = null;

    #[ORM\Column(nullable: true)]
    private ?float $b3 = null;

    #[ORM\Column(nullable: true)]
    private ?float $b4 = null;

    #[ORM\Column(nullable: true)]
    private ?float $b5 = null;

    #[ORM\Column(nullable: true)]
    private ?float $b6 = null;

    #[ORM\Column(nullable: true)]
    private ?float $b7 = null;

    #[ORM\Column(nullable: true)]
    private ?int $d = null;

    #[ORM\ManyToOne(inversedBy: 'coefficientUserCreate')]
    private ?Users $userCreate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateCreate = null;

    #[ORM\ManyToOne(inversedBy: 'coefficientUserUpdate')]
    private ?Users $userUpdate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateUpdate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getB0(): ?float
    {
        return $this->b0;
    }

    public function setB0(?float $b0): static
    {
        $this->b0 = $b0;

        return $this;
    }

    public function getB1(): ?float
    {
        return $this->b1;
    }

    public function setB1(?float $b1): static
    {
        $this->b1 = $b1;

        return $this;
    }

    public function getB2(): ?float
    {
        return $this->b2;
    }

    public function setB2(?float $b2): static
    {
        $this->b2 = $b2;

        return $this;
    }

    public function getB3(): ?float
    {
        return $this->b3;
    }

    public function setB3(?float $b3): static
    {
        $this->b3 = $b3;

        return $this;
    }

    public function getB4(): ?float
    {
        return $this->b4;
    }

    public function setB4(?float $b4): static
    {
        $this->b4 = $b4;

        return $this;
    }

    public function getB5(): ?float
    {
        return $this->b5;
    }

    public function setB5(?float $b5): static
    {
        $this->b5 = $b5;

        return $this;
    }

    public function getB6(): ?float
    {
        return $this->b6;
    }

    public function setB6(?float $b6): static
    {
        $this->b6 = $b6;

        return $this;
    }

    public function getB7(): ?float
    {
        return $this->b7;
    }

    public function setB7(?float $b7): static
    {
        $this->b7 = $b7;

        return $this;
    }

    public function getD(): ?int
    {
        return $this->d;
    }

    public function setD(?int $d): static
    {
        $this->d = $d;

        return $this;
    }

    public function getUserCreate(): ?Users
    {
        return $this->userCreate;
    }

    public function setUserCreate(?Users $userCreate): static
    {
        $this->userCreate = $userCreate;

        return $this;
    }

    public function getDateCreate(): ?\DateTimeInterface
    {
        return $this->dateCreate;
    }

    public function setDateCreate(?\DateTimeInterface $dateCreate): static
    {
        $this->dateCreate = $dateCreate;

        return $this;
    }

    public function getUserUpdate(): ?Users
    {
        return $this->userUpdate;
    }

    public function setUserUpdate(?Users $userUpdate): static
    {
        $this->userUpdate = $userUpdate;

        return $this;
    }

    public function getDateUpdate(): ?\DateTimeInterface
    {
        return $this->dateUpdate;
    }

    public function setDateUpdate(?\DateTimeInterface $dateUpdate): static
    {
        $this->dateUpdate = $dateUpdate;

        return $this;
    }
}
