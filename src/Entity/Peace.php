<?php

namespace App\Entity;

use App\Repository\PeaceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PeaceRepository::class)]
class Peace
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'peaceFactor')]
    private ?Factors $factor = null;

    #[ORM\ManyToOne(inversedBy: 'peaces')]
    private ?Provinces $province = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $year = null;

    #[ORM\Column(nullable: true)]
    private ?float $value = null;

    #[ORM\ManyToOne(inversedBy: 'peaceCreate')]
    private ?Users $userCreate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateCreate = null;

    #[ORM\ManyToOne(inversedBy: 'peaceUpdate')]
    private ?Users $userUpdate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateUpdate = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isEnabled = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFactor(): ?Factors
    {
        return $this->factor;
    }

    public function setFactor(?Factors $factor): static
    {
        $this->factor = $factor;

        return $this;
    }

    public function getProvince(): ?Provinces
    {
        return $this->province;
    }

    public function setProvince(?Provinces $province): static
    {
        $this->province = $province;

        return $this;
    }

    public function getYear(): ?string
    {
        return $this->year;
    }

    public function setYear(?string $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function getValue(): ?float
    {
        return $this->value;
    }

    public function setValue(?float $value): static
    {
        $this->value = $value;

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

    public function isIsEnabled(): ?bool
    {
        return $this->isEnabled;
    }

    public function setIsEnabled(?bool $isEnabled): static
    {
        $this->isEnabled = $isEnabled;

        return $this;
    }
}
