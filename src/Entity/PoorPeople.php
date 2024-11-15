<?php

namespace App\Entity;

use App\Repository\PoorPeopleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PoorPeopleRepository::class)]
class PoorPeople
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'poorPeople')]
    private ?Provinces $province = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $year = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 11, scale: 4, nullable: true)]
    private ?string $gpp = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 13, scale: 6, nullable: true)]
    private ?string $value = null;

    #[ORM\ManyToOne(inversedBy: 'poorPeopleCreate')]
    private ?Users $userCreate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateCreate = null;

    #[ORM\ManyToOne(inversedBy: 'poorPeopleUpdate')]
    private ?Users $userUpdate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateUpdate = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isEnabled = null;

    #[ORM\ManyToOne(inversedBy: 'poorPeopleFactor')]
    private ?Factors $factor = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getGpp(): ?string
    {
        return $this->gpp;
    }

    public function setGpp(?string $gpp): static
    {
        $this->gpp = $gpp;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(?string $value): static
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

    public function getFactor(): ?Factors
    {
        return $this->factor;
    }

    public function setFactor(?Factors $factor): static
    {
        $this->factor = $factor;

        return $this;
    }
}
