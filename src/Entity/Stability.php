<?php

namespace App\Entity;

use App\Repository\StabilityRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StabilityRepository::class)]
class Stability
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'stabilities')]
    private ?Provinces $province = null;

    #[ORM\ManyToOne(inversedBy: 'stabilityFactor')]
    private ?Factors $factor = null;

    #[ORM\ManyToOne(inversedBy: 'stabilitySubFactor')]
    private ?Factors $subFactor = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $year = null;

    #[ORM\Column(nullable: true)]
    private ?float $value1 = null;

    #[ORM\Column(nullable: true)]
    private ?float $value2 = null;

    #[ORM\Column(nullable: true)]
    private ?float $value3 = null;

    #[ORM\Column(nullable: true)]
    private ?float $value4 = null;

    #[ORM\Column(nullable: true)]
    private ?float $value5 = null;

    #[ORM\ManyToOne(inversedBy: 'stabilityCreate')]
    private ?Users $userCreate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateCreate = null;

    #[ORM\ManyToOne(inversedBy: 'stabilityUpdate')]
    private ?Users $userUpdate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateUpdate = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isEnabled = null;

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

    public function getFactor(): ?Factors
    {
        return $this->factor;
    }

    public function setFactor(?Factors $factor): static
    {
        $this->factor = $factor;

        return $this;
    }

    public function getSubFactor(): ?Factors
    {
        return $this->subFactor;
    }

    public function setSubFactor(?Factors $subFactor): static
    {
        $this->subFactor = $subFactor;

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

    public function getValue1(): ?float
    {
        return $this->value1;
    }

    public function setValue1(?float $value1): static
    {
        $this->value1 = $value1;

        return $this;
    }

    public function getValue2(): ?float
    {
        return $this->value2;
    }

    public function setValue2(?float $value2): static
    {
        $this->value2 = $value2;

        return $this;
    }

    public function getValue3(): ?float
    {
        return $this->value3;
    }

    public function setValue3(?float $value3): static
    {
        $this->value3 = $value3;

        return $this;
    }

    public function getValue4(): ?float
    {
        return $this->value4;
    }

    public function setValue4(?float $value4): static
    {
        $this->value4 = $value4;

        return $this;
    }

    public function getValue5(): ?float
    {
        return $this->value5;
    }

    public function setValue5(?float $value5): static
    {
        $this->value5 = $value5;

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
