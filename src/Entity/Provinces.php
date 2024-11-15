<?php

namespace App\Entity;

use App\Repository\ProvincesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProvincesRepository::class)]
class Provinces
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $provinceId = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $provinceName = null;

    #[ORM\OneToMany(mappedBy: 'provinceId', targetEntity: Population::class)]
    private Collection $populations;

    #[ORM\Column(nullable: true)]
    private ?float $d = null;

    #[ORM\OneToMany(mappedBy: 'province', targetEntity: Houses::class)]
    private Collection $provinceHouses;

    #[ORM\OneToMany(mappedBy: 'province', targetEntity: PoorPeople::class)]
    private Collection $poorPeople;

    #[ORM\OneToMany(mappedBy: 'province', targetEntity: HumanDeverlopment::class)]
    private Collection $humanDeverlopments;

    #[ORM\OneToMany(mappedBy: 'province', targetEntity: Economic::class)]
    private Collection $economics;

    #[ORM\OneToMany(mappedBy: 'province', targetEntity: Environment::class)]
    private Collection $environments;

    #[ORM\OneToMany(mappedBy: 'province', targetEntity: Peace::class)]
    private Collection $peaces;

    #[ORM\OneToMany(mappedBy: 'province', targetEntity: Partnership::class)]
    private Collection $partnerships;

    #[ORM\OneToMany(mappedBy: 'province', targetEntity: Stability::class)]
    private Collection $stabilities;

    #[ORM\OneToMany(mappedBy: 'province', targetEntity: Escape::class)]
    private Collection $escapes;

    public function __construct()
    {
        $this->populations = new ArrayCollection();
        $this->provinceHouses = new ArrayCollection();
        $this->poorPeople = new ArrayCollection();
        $this->humanDeverlopments = new ArrayCollection();
        $this->economics = new ArrayCollection();
        $this->environments = new ArrayCollection();
        $this->peaces = new ArrayCollection();
        $this->partnerships = new ArrayCollection();
        $this->stabilities = new ArrayCollection();
        $this->escapes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProvinceId(): ?int
    {
        return $this->provinceId;
    }

    public function setProvinceId(?int $provinceId): static
    {
        $this->provinceId = $provinceId;

        return $this;
    }

    public function getProvinceName(): ?string
    {
        return $this->provinceName;
    }

    public function setProvinceName(?string $provinceName): static
    {
        $this->provinceName = $provinceName;

        return $this;
    }

    /**
     * @return Collection<int, Population>
     */
    public function getPopulations(): Collection
    {
        return $this->populations;
    }

    public function addPopulation(Population $population): static
    {
        if (!$this->populations->contains($population)) {
            $this->populations->add($population);
            $population->setProvinceId($this);
        }

        return $this;
    }

    public function removePopulation(Population $population): static
    {
        if ($this->populations->removeElement($population)) {
            // set the owning side to null (unless already changed)
            if ($population->getProvinceId() === $this) {
                $population->setProvinceId(null);
            }
        }

        return $this;
    }

    public function getD(): ?float
    {
        return $this->d;
    }

    public function setD(?float $d): static
    {
        $this->d = $d;

        return $this;
    }

    /**
     * @return Collection<int, Houses>
     */
    public function getProvinceHouses(): Collection
    {
        return $this->provinceHouses;
    }

    public function addProvinceHouse(Houses $provinceHouse): static
    {
        if (!$this->provinceHouses->contains($provinceHouse)) {
            $this->provinceHouses->add($provinceHouse);
            $provinceHouse->setProvince($this);
        }

        return $this;
    }

    public function removeProvinceHouse(Houses $provinceHouse): static
    {
        if ($this->provinceHouses->removeElement($provinceHouse)) {
            // set the owning side to null (unless already changed)
            if ($provinceHouse->getProvince() === $this) {
                $provinceHouse->setProvince(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PoorPeople>
     */
    public function getPoorPeople(): Collection
    {
        return $this->poorPeople;
    }

    public function addPoorPerson(PoorPeople $poorPerson): static
    {
        if (!$this->poorPeople->contains($poorPerson)) {
            $this->poorPeople->add($poorPerson);
            $poorPerson->setProvince($this);
        }

        return $this;
    }

    public function removePoorPerson(PoorPeople $poorPerson): static
    {
        if ($this->poorPeople->removeElement($poorPerson)) {
            // set the owning side to null (unless already changed)
            if ($poorPerson->getProvince() === $this) {
                $poorPerson->setProvince(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, HumanDeverlopment>
     */
    public function getHumanDeverlopments(): Collection
    {
        return $this->humanDeverlopments;
    }

    public function addHumanDeverlopment(HumanDeverlopment $humanDeverlopment): static
    {
        if (!$this->humanDeverlopments->contains($humanDeverlopment)) {
            $this->humanDeverlopments->add($humanDeverlopment);
            $humanDeverlopment->setProvince($this);
        }

        return $this;
    }

    public function removeHumanDeverlopment(HumanDeverlopment $humanDeverlopment): static
    {
        if ($this->humanDeverlopments->removeElement($humanDeverlopment)) {
            // set the owning side to null (unless already changed)
            if ($humanDeverlopment->getProvince() === $this) {
                $humanDeverlopment->setProvince(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Economic>
     */
    public function getEconomics(): Collection
    {
        return $this->economics;
    }

    public function addEconomic(Economic $economic): static
    {
        if (!$this->economics->contains($economic)) {
            $this->economics->add($economic);
            $economic->setProvince($this);
        }

        return $this;
    }

    public function removeEconomic(Economic $economic): static
    {
        if ($this->economics->removeElement($economic)) {
            // set the owning side to null (unless already changed)
            if ($economic->getProvince() === $this) {
                $economic->setProvince(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Environment>
     */
    public function getEnvironments(): Collection
    {
        return $this->environments;
    }

    public function addEnvironment(Environment $environment): static
    {
        if (!$this->environments->contains($environment)) {
            $this->environments->add($environment);
            $environment->setProvince($this);
        }

        return $this;
    }

    public function removeEnvironment(Environment $environment): static
    {
        if ($this->environments->removeElement($environment)) {
            // set the owning side to null (unless already changed)
            if ($environment->getProvince() === $this) {
                $environment->setProvince(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Peace>
     */
    public function getPeaces(): Collection
    {
        return $this->peaces;
    }

    public function addPeace(Peace $peace): static
    {
        if (!$this->peaces->contains($peace)) {
            $this->peaces->add($peace);
            $peace->setProvince($this);
        }

        return $this;
    }

    public function removePeace(Peace $peace): static
    {
        if ($this->peaces->removeElement($peace)) {
            // set the owning side to null (unless already changed)
            if ($peace->getProvince() === $this) {
                $peace->setProvince(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Partnership>
     */
    public function getPartnerships(): Collection
    {
        return $this->partnerships;
    }

    public function addPartnership(Partnership $partnership): static
    {
        if (!$this->partnerships->contains($partnership)) {
            $this->partnerships->add($partnership);
            $partnership->setProvince($this);
        }

        return $this;
    }

    public function removePartnership(Partnership $partnership): static
    {
        if ($this->partnerships->removeElement($partnership)) {
            // set the owning side to null (unless already changed)
            if ($partnership->getProvince() === $this) {
                $partnership->setProvince(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Stability>
     */
    public function getStabilities(): Collection
    {
        return $this->stabilities;
    }

    public function addStability(Stability $stability): static
    {
        if (!$this->stabilities->contains($stability)) {
            $this->stabilities->add($stability);
            $stability->setProvince($this);
        }

        return $this;
    }

    public function removeStability(Stability $stability): static
    {
        if ($this->stabilities->removeElement($stability)) {
            // set the owning side to null (unless already changed)
            if ($stability->getProvince() === $this) {
                $stability->setProvince(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Escape>
     */
    public function getEscapes(): Collection
    {
        return $this->escapes;
    }

    public function addEscape(Escape $escape): static
    {
        if (!$this->escapes->contains($escape)) {
            $this->escapes->add($escape);
            $escape->setProvince($this);
        }

        return $this;
    }

    public function removeEscape(Escape $escape): static
    {
        if ($this->escapes->removeElement($escape)) {
            // set the owning side to null (unless already changed)
            if ($escape->getProvince() === $this) {
                $escape->setProvince(null);
            }
        }

        return $this;
    }
}
