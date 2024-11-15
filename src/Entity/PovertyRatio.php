<?php

namespace App\Entity;

use App\Repository\PovertyRatioRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PovertyRatioRepository::class)]
class PovertyRatio
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $province_id = null;

    #[ORM\Column(length: 500, nullable: true)]
    private ?string $province = null;

    #[ORM\Column(nullable: true)]
    private ?float $y = null;

    #[ORM\Column(nullable: true)]
    private ?float $x1 = null;

    #[ORM\Column(nullable: true)]
    private ?float $x2 = null;

    #[ORM\Column(nullable: true)]
    private ?float $x3 = null;

    #[ORM\Column(nullable: true)]
    private ?float $x4 = null;

    #[ORM\Column(nullable: true)]
    private ?float $x5 = null;

    #[ORM\Column(nullable: true)]
    private ?float $x6 = null;

    #[ORM\Column(nullable: true)]
    private ?int $d = null;

    #[ORM\ManyToOne(inversedBy: 'povertyRatioUserCreate')]
    private ?Users $userCreate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateCreate = null;

    #[ORM\ManyToOne(inversedBy: 'povertyRatioUserUpdate')]
    private ?Users $userUpdate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $dateUpdate = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $year = null;

    #[ORM\Column(nullable: true)]
    private ?bool $enabled = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProvinceId(): ?int
    {
        return $this->province_id;
    }

    public function setProvinceId(?int $province_id): static
    {
        $this->province_id = $province_id;

        return $this;
    }

    public function getProvince(): ?string
    {
        return $this->province;
    }

    public function setProvince(?string $province): static
    {
        $this->province = $province;

        return $this;
    }

    public function getY(): ?float
    {
        return $this->y;
    }

    public function setY(?float $y): static
    {
        $this->y = $y;

        return $this;
    }

    public function getX1(): ?float
    {
        return $this->x1;
    }

    public function setX1(?float $x1): static
    {
        $this->x1 = $x1;

        return $this;
    }

    public function getX2(): ?float
    {
        return $this->x2;
    }

    public function setX2(?float $x2): static
    {
        $this->x2 = $x2;

        return $this;
    }

    public function getX3(): ?float
    {
        return $this->x3;
    }

    public function setX3(?float $x3): static
    {
        $this->x3 = $x3;

        return $this;
    }

    public function getX4(): ?float
    {
        return $this->x4;
    }

    public function setX4(?float $x4): static
    {
        $this->x4 = $x4;

        return $this;
    }

    public function getX5(): ?float
    {
        return $this->x5;
    }

    public function setX5(?float $x5): static
    {
        $this->x5 = $x5;

        return $this;
    }

    public function getX6(): ?float
    {
        return $this->x6;
    }

    public function setX6(?float $x6): static
    {
        $this->x6 = $x6;

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

    public function getYear(): ?string
    {
        return $this->year;
    }

    public function setYear(?string $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function isEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(?bool $enabled): static
    {
        $this->enabled = $enabled;

        return $this;
    }
}
