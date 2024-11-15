<?php

namespace App\Entity;

use App\Repository\FactorsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FactorsRepository::class)]
class Factors
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 500, nullable: true)]
    private ?string $factorName = null;

    #[ORM\OneToMany(mappedBy: 'factor', targetEntity: Population::class)]
    private Collection $populationFactor;

    #[ORM\OneToMany(mappedBy: 'factor', targetEntity: Houses::class)]
    private Collection $housesFactor;

    #[ORM\OneToMany(mappedBy: 'factor', targetEntity: PoorPeople::class)]
    private Collection $poorPeopleFactor;

    #[ORM\OneToMany(mappedBy: 'factor', targetEntity: HumanDeverlopment::class)]
    private Collection $HumanDeverlopmentFactor;

    #[ORM\OneToMany(mappedBy: 'factor', targetEntity: Economic::class)]
    private Collection $economicFactor;

    #[ORM\OneToMany(mappedBy: 'factor', targetEntity: Environment::class)]
    private Collection $environmentFactor;

    #[ORM\OneToMany(mappedBy: 'factor', targetEntity: Peace::class)]
    private Collection $peaceFactor;

    #[ORM\OneToMany(mappedBy: 'factor', targetEntity: Partnership::class)]
    private Collection $partnershipFactor;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $factorNameEng = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $subGroup = null;

    #[ORM\OneToMany(mappedBy: 'factor', targetEntity: Stability::class)]
    private Collection $stabilityFactor;

    #[ORM\OneToMany(mappedBy: 'subFactor', targetEntity: Stability::class)]
    private Collection $stabilitySubFactor;

    #[ORM\OneToMany(mappedBy: 'factor', targetEntity: Escape::class)]
    private Collection $escapeFactor;

    #[ORM\OneToMany(mappedBy: 'subFactor', targetEntity: Escape::class)]
    private Collection $escapeSubFactor;

    public function __construct()
    {
        $this->populationFactor = new ArrayCollection();
        $this->housesFactor = new ArrayCollection();
        $this->poorPeopleFactor = new ArrayCollection();
        $this->HumanDeverlopmentFactor = new ArrayCollection();
        $this->economicFactor = new ArrayCollection();
        $this->environmentFactor = new ArrayCollection();
        $this->peaceFactor = new ArrayCollection();
        $this->partnershipFactor = new ArrayCollection();
        $this->stabilityFactor = new ArrayCollection();
        $this->stabilitySubFactor = new ArrayCollection();
        $this->escapeFactor = new ArrayCollection();
        $this->escapeSubFactor = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFactorName(): ?string
    {
        return $this->factorName;
    }

    public function setFactorName(?string $factorName): static
    {
        $this->factorName = $factorName;

        return $this;
    }

    /**
     * @return Collection<int, Population>
     */
    public function getPopulationFactor(): Collection
    {
        return $this->populationFactor;
    }

    public function addPopulationFactor(Population $populationFactor): static
    {
        if (!$this->populationFactor->contains($populationFactor)) {
            $this->populationFactor->add($populationFactor);
            $populationFactor->setFactor($this);
        }

        return $this;
    }

    public function removePopulationFactor(Population $populationFactor): static
    {
        if ($this->populationFactor->removeElement($populationFactor)) {
            // set the owning side to null (unless already changed)
            if ($populationFactor->getFactor() === $this) {
                $populationFactor->setFactor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Houses>
     */
    public function getHousesFactor(): Collection
    {
        return $this->housesFactor;
    }

    public function addHousesFactor(Houses $housesFactor): static
    {
        if (!$this->housesFactor->contains($housesFactor)) {
            $this->housesFactor->add($housesFactor);
            $housesFactor->setFactor($this);
        }

        return $this;
    }

    public function removeHousesFactor(Houses $housesFactor): static
    {
        if ($this->housesFactor->removeElement($housesFactor)) {
            // set the owning side to null (unless already changed)
            if ($housesFactor->getFactor() === $this) {
                $housesFactor->setFactor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PoorPeople>
     */
    public function getPoorPeopleFactor(): Collection
    {
        return $this->poorPeopleFactor;
    }

    public function addPoorPeopleFactor(PoorPeople $poorPeopleFactor): static
    {
        if (!$this->poorPeopleFactor->contains($poorPeopleFactor)) {
            $this->poorPeopleFactor->add($poorPeopleFactor);
            $poorPeopleFactor->setFactor($this);
        }

        return $this;
    }

    public function removePoorPeopleFactor(PoorPeople $poorPeopleFactor): static
    {
        if ($this->poorPeopleFactor->removeElement($poorPeopleFactor)) {
            // set the owning side to null (unless already changed)
            if ($poorPeopleFactor->getFactor() === $this) {
                $poorPeopleFactor->setFactor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, HumanDeverlopment>
     */
    public function getHumanDeverlopmentFactor(): Collection
    {
        return $this->HumanDeverlopmentFactor;
    }

    public function addHumanDeverlopmentFactor(HumanDeverlopment $humanDeverlopmentFactor): static
    {
        if (!$this->HumanDeverlopmentFactor->contains($humanDeverlopmentFactor)) {
            $this->HumanDeverlopmentFactor->add($humanDeverlopmentFactor);
            $humanDeverlopmentFactor->setFactor($this);
        }

        return $this;
    }

    public function removeHumanDeverlopmentFactor(HumanDeverlopment $humanDeverlopmentFactor): static
    {
        if ($this->HumanDeverlopmentFactor->removeElement($humanDeverlopmentFactor)) {
            // set the owning side to null (unless already changed)
            if ($humanDeverlopmentFactor->getFactor() === $this) {
                $humanDeverlopmentFactor->setFactor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Economic>
     */
    public function getEconomicFactor(): Collection
    {
        return $this->economicFactor;
    }

    public function addEconomicFactor(Economic $economicFactor): static
    {
        if (!$this->economicFactor->contains($economicFactor)) {
            $this->economicFactor->add($economicFactor);
            $economicFactor->setFactor($this);
        }

        return $this;
    }

    public function removeEconomicFactor(Economic $economicFactor): static
    {
        if ($this->economicFactor->removeElement($economicFactor)) {
            // set the owning side to null (unless already changed)
            if ($economicFactor->getFactor() === $this) {
                $economicFactor->setFactor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Environment>
     */
    public function getEnvironmentFactor(): Collection
    {
        return $this->environmentFactor;
    }

    public function addEnvironmentFactor(Environment $environmentFactor): static
    {
        if (!$this->environmentFactor->contains($environmentFactor)) {
            $this->environmentFactor->add($environmentFactor);
            $environmentFactor->setFactor($this);
        }

        return $this;
    }

    public function removeEnvironmentFactor(Environment $environmentFactor): static
    {
        if ($this->environmentFactor->removeElement($environmentFactor)) {
            // set the owning side to null (unless already changed)
            if ($environmentFactor->getFactor() === $this) {
                $environmentFactor->setFactor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Peace>
     */
    public function getPeaceFactor(): Collection
    {
        return $this->peaceFactor;
    }

    public function addPeaceFactor(Peace $peaceFactor): static
    {
        if (!$this->peaceFactor->contains($peaceFactor)) {
            $this->peaceFactor->add($peaceFactor);
            $peaceFactor->setFactor($this);
        }

        return $this;
    }

    public function removePeaceFactor(Peace $peaceFactor): static
    {
        if ($this->peaceFactor->removeElement($peaceFactor)) {
            // set the owning side to null (unless already changed)
            if ($peaceFactor->getFactor() === $this) {
                $peaceFactor->setFactor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Partnership>
     */
    public function getPartnershipFactor(): Collection
    {
        return $this->partnershipFactor;
    }

    public function addPartnershipFactor(Partnership $partnershipFactor): static
    {
        if (!$this->partnershipFactor->contains($partnershipFactor)) {
            $this->partnershipFactor->add($partnershipFactor);
            $partnershipFactor->setFactor($this);
        }

        return $this;
    }

    public function removePartnershipFactor(Partnership $partnershipFactor): static
    {
        if ($this->partnershipFactor->removeElement($partnershipFactor)) {
            // set the owning side to null (unless already changed)
            if ($partnershipFactor->getFactor() === $this) {
                $partnershipFactor->setFactor(null);
            }
        }

        return $this;
    }

    public function getFactorNameEng(): ?string
    {
        return $this->factorNameEng;
    }

    public function setFactorNameEng(?string $factorNameEng): static
    {
        $this->factorNameEng = $factorNameEng;

        return $this;
    }

    public function getSubGroup(): ?string
    {
        return $this->subGroup;
    }

    public function setSubGroup(?string $subGroup): static
    {
        $this->subGroup = $subGroup;

        return $this;
    }

    /**
     * @return Collection<int, Stability>
     */
    public function getStabilityFactor(): Collection
    {
        return $this->stabilityFactor;
    }

    public function addStabilityFactor(Stability $stabilityFactor): static
    {
        if (!$this->stabilityFactor->contains($stabilityFactor)) {
            $this->stabilityFactor->add($stabilityFactor);
            $stabilityFactor->setFactor($this);
        }

        return $this;
    }

    public function removeStabilityFactor(Stability $stabilityFactor): static
    {
        if ($this->stabilityFactor->removeElement($stabilityFactor)) {
            // set the owning side to null (unless already changed)
            if ($stabilityFactor->getFactor() === $this) {
                $stabilityFactor->setFactor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Stability>
     */
    public function getStabilitySubFactor(): Collection
    {
        return $this->stabilitySubFactor;
    }

    public function addStabilitySubFactor(Stability $stabilitySubFactor): static
    {
        if (!$this->stabilitySubFactor->contains($stabilitySubFactor)) {
            $this->stabilitySubFactor->add($stabilitySubFactor);
            $stabilitySubFactor->setSubFactor($this);
        }

        return $this;
    }

    public function removeStabilitySubFactor(Stability $stabilitySubFactor): static
    {
        if ($this->stabilitySubFactor->removeElement($stabilitySubFactor)) {
            // set the owning side to null (unless already changed)
            if ($stabilitySubFactor->getSubFactor() === $this) {
                $stabilitySubFactor->setSubFactor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Escape>
     */
    public function getEscapeFactor(): Collection
    {
        return $this->escapeFactor;
    }

    public function addEscapeFactor(Escape $escapeFactor): static
    {
        if (!$this->escapeFactor->contains($escapeFactor)) {
            $this->escapeFactor->add($escapeFactor);
            $escapeFactor->setFactor($this);
        }

        return $this;
    }

    public function removeEscapeFactor(Escape $escapeFactor): static
    {
        if ($this->escapeFactor->removeElement($escapeFactor)) {
            // set the owning side to null (unless already changed)
            if ($escapeFactor->getFactor() === $this) {
                $escapeFactor->setFactor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Escape>
     */
    public function getEscapeSubFactor(): Collection
    {
        return $this->escapeSubFactor;
    }

    public function addEscapeSubFactor(Escape $escapeSubFactor): static
    {
        if (!$this->escapeSubFactor->contains($escapeSubFactor)) {
            $this->escapeSubFactor->add($escapeSubFactor);
            $escapeSubFactor->setSubFactor($this);
        }

        return $this;
    }

    public function removeEscapeSubFactor(Escape $escapeSubFactor): static
    {
        if ($this->escapeSubFactor->removeElement($escapeSubFactor)) {
            // set the owning side to null (unless already changed)
            if ($escapeSubFactor->getSubFactor() === $this) {
                $escapeSubFactor->setSubFactor(null);
            }
        }

        return $this;
    }
}
