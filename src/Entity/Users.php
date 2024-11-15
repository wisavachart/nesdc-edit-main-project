<?php

namespace App\Entity;

use App\Repository\UsersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UsersRepository::class)]
class Users implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private $email;

    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(length: 1000, nullable: true)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: PovertyRatio::class)]
    private Collection $povertyRatioUserCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: PovertyRatio::class)]
    private Collection $povertyRatioUserUpdate;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: Coefficient::class)]
    private Collection $coefficientUserCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: Coefficient::class)]
    private Collection $coefficientUserUpdate;

    #[ORM\Column(nullable: true)]
    private ?bool $isEnabled = null;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: Population::class)]
    private Collection $populationCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: Population::class)]
    private Collection $populationUpdate;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: Houses::class)]
    private Collection $housesCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: Houses::class)]
    private Collection $housesUpdate;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: PoorPeople::class)]
    private Collection $poorPeopleCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: PoorPeople::class)]
    private Collection $poorPeopleUpdate;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: HumanDeverlopment::class)]
    private Collection $humanDeverlopmentCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: HumanDeverlopment::class)]
    private Collection $humanDeverlopmentUpdate;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: Economic::class)]
    private Collection $economicCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: Economic::class)]
    private Collection $economicUpdate;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: Environment::class)]
    private Collection $environmentCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: Environment::class)]
    private Collection $environmentUpdate;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: Peace::class)]
    private Collection $peaceCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: Peace::class)]
    private Collection $peaceUpdate;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: Partnership::class)]
    private Collection $partnershipCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: Partnership::class)]
    private Collection $partnershipUpdate;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: Stability::class)]
    private Collection $stabilityCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: Stability::class)]
    private Collection $stabilityUpdate;

    #[ORM\OneToMany(mappedBy: 'userCreate', targetEntity: Escape::class)]
    private Collection $escapeCreate;

    #[ORM\OneToMany(mappedBy: 'userUpdate', targetEntity: Escape::class)]
    private Collection $escapeUpdate;

    public function __construct()
    {
        $this->povertyRatioUserCreate = new ArrayCollection();
        $this->povertyRatioUserUpdate = new ArrayCollection();
        $this->coefficientUserCreate = new ArrayCollection();
        $this->coefficientUserUpdate = new ArrayCollection();
        $this->populationCreate = new ArrayCollection();
        $this->populationUpdate = new ArrayCollection();
        $this->housesCreate = new ArrayCollection();
        $this->housesUpdate = new ArrayCollection();
        $this->poorPeopleCreate = new ArrayCollection();
        $this->poorPeopleUpdate = new ArrayCollection();
        $this->humanDeverlopmentCreate = new ArrayCollection();
        $this->humanDeverlopmentUpdate = new ArrayCollection();
        $this->economicCreate = new ArrayCollection();
        $this->economicUpdate = new ArrayCollection();
        $this->environmentCreate = new ArrayCollection();
        $this->environmentUpdate = new ArrayCollection();
        $this->peaceCreate = new ArrayCollection();
        $this->peaceUpdate = new ArrayCollection();
        $this->partnershipCreate = new ArrayCollection();
        $this->partnershipUpdate = new ArrayCollection();
        $this->stabilityCreate = new ArrayCollection();
        $this->stabilityUpdate = new ArrayCollection();
        $this->escapeCreate = new ArrayCollection();
        $this->escapeUpdate = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, PovertyRatio>
     */
    public function getPovertyRatioUserCreate(): Collection
    {
        return $this->povertyRatioUserCreate;
    }

    public function addPovertyRatioUserCreate(PovertyRatio $povertyRatioUserCreate): static
    {
        if (!$this->povertyRatioUserCreate->contains($povertyRatioUserCreate)) {
            $this->povertyRatioUserCreate->add($povertyRatioUserCreate);
            $povertyRatioUserCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removePovertyRatioUserCreate(PovertyRatio $povertyRatioUserCreate): static
    {
        if ($this->povertyRatioUserCreate->removeElement($povertyRatioUserCreate)) {
            // set the owning side to null (unless already changed)
            if ($povertyRatioUserCreate->getUserCreate() === $this) {
                $povertyRatioUserCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PovertyRatio>
     */
    public function getPovertyRatioUserUpdate(): Collection
    {
        return $this->povertyRatioUserUpdate;
    }

    public function addPovertyRatioUserUpdate(PovertyRatio $povertyRatioUserUpdate): static
    {
        if (!$this->povertyRatioUserUpdate->contains($povertyRatioUserUpdate)) {
            $this->povertyRatioUserUpdate->add($povertyRatioUserUpdate);
            $povertyRatioUserUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removePovertyRatioUserUpdate(PovertyRatio $povertyRatioUserUpdate): static
    {
        if ($this->povertyRatioUserUpdate->removeElement($povertyRatioUserUpdate)) {
            // set the owning side to null (unless already changed)
            if ($povertyRatioUserUpdate->getUserUpdate() === $this) {
                $povertyRatioUserUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Coefficient>
     */
    public function getCoefficientUserCreate(): Collection
    {
        return $this->coefficientUserCreate;
    }

    public function addCoefficientUserCreate(Coefficient $coefficientUserCreate): static
    {
        if (!$this->coefficientUserCreate->contains($coefficientUserCreate)) {
            $this->coefficientUserCreate->add($coefficientUserCreate);
            $coefficientUserCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removeCoefficientUserCreate(Coefficient $coefficientUserCreate): static
    {
        if ($this->coefficientUserCreate->removeElement($coefficientUserCreate)) {
            // set the owning side to null (unless already changed)
            if ($coefficientUserCreate->getUserCreate() === $this) {
                $coefficientUserCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Coefficient>
     */
    public function getCoefficientUserUpdate(): Collection
    {
        return $this->coefficientUserUpdate;
    }

    public function addCoefficientUserUpdate(Coefficient $coefficientUserUpdate): static
    {
        if (!$this->coefficientUserUpdate->contains($coefficientUserUpdate)) {
            $this->coefficientUserUpdate->add($coefficientUserUpdate);
            $coefficientUserUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removeCoefficientUserUpdate(Coefficient $coefficientUserUpdate): static
    {
        if ($this->coefficientUserUpdate->removeElement($coefficientUserUpdate)) {
            // set the owning side to null (unless already changed)
            if ($coefficientUserUpdate->getUserUpdate() === $this) {
                $coefficientUserUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    /**
     * @return Collection<int, Population>
     */
    public function getPopulationCreate(): Collection
    {
        return $this->populationCreate;
    }

    public function addPopulationCreate(Population $populationCreate): static
    {
        if (!$this->populationCreate->contains($populationCreate)) {
            $this->populationCreate->add($populationCreate);
            $populationCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removePopulationCreate(Population $populationCreate): static
    {
        if ($this->populationCreate->removeElement($populationCreate)) {
            // set the owning side to null (unless already changed)
            if ($populationCreate->getUserCreate() === $this) {
                $populationCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Population>
     */
    public function getPopulationUpdate(): Collection
    {
        return $this->populationUpdate;
    }

    public function addPopulationUpdate(Population $populationUpdate): static
    {
        if (!$this->populationUpdate->contains($populationUpdate)) {
            $this->populationUpdate->add($populationUpdate);
            $populationUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removePopulationUpdate(Population $populationUpdate): static
    {
        if ($this->populationUpdate->removeElement($populationUpdate)) {
            // set the owning side to null (unless already changed)
            if ($populationUpdate->getUserUpdate() === $this) {
                $populationUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Houses>
     */
    public function getHousesCreate(): Collection
    {
        return $this->housesCreate;
    }

    public function addHousesCreate(Houses $housesCreate): static
    {
        if (!$this->housesCreate->contains($housesCreate)) {
            $this->housesCreate->add($housesCreate);
            $housesCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removeHousesCreate(Houses $housesCreate): static
    {
        if ($this->housesCreate->removeElement($housesCreate)) {
            // set the owning side to null (unless already changed)
            if ($housesCreate->getUserCreate() === $this) {
                $housesCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Houses>
     */
    public function getHousesUpdate(): Collection
    {
        return $this->housesUpdate;
    }

    public function addHousesUpdate(Houses $housesUpdate): static
    {
        if (!$this->housesUpdate->contains($housesUpdate)) {
            $this->housesUpdate->add($housesUpdate);
            $housesUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removeHousesUpdate(Houses $housesUpdate): static
    {
        if ($this->housesUpdate->removeElement($housesUpdate)) {
            // set the owning side to null (unless already changed)
            if ($housesUpdate->getUserUpdate() === $this) {
                $housesUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PoorPeople>
     */
    public function getPoorPeopleCreate(): Collection
    {
        return $this->poorPeopleCreate;
    }

    public function addPoorPeopleCreate(PoorPeople $poorPeopleCreate): static
    {
        if (!$this->poorPeopleCreate->contains($poorPeopleCreate)) {
            $this->poorPeopleCreate->add($poorPeopleCreate);
            $poorPeopleCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removePoorPeopleCreate(PoorPeople $poorPeopleCreate): static
    {
        if ($this->poorPeopleCreate->removeElement($poorPeopleCreate)) {
            // set the owning side to null (unless already changed)
            if ($poorPeopleCreate->getUserCreate() === $this) {
                $poorPeopleCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PoorPeople>
     */
    public function getPoorPeopleUpdate(): Collection
    {
        return $this->poorPeopleUpdate;
    }

    public function addPoorPeopleUpdate(PoorPeople $poorPeopleUpdate): static
    {
        if (!$this->poorPeopleUpdate->contains($poorPeopleUpdate)) {
            $this->poorPeopleUpdate->add($poorPeopleUpdate);
            $poorPeopleUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removePoorPeopleUpdate(PoorPeople $poorPeopleUpdate): static
    {
        if ($this->poorPeopleUpdate->removeElement($poorPeopleUpdate)) {
            // set the owning side to null (unless already changed)
            if ($poorPeopleUpdate->getUserUpdate() === $this) {
                $poorPeopleUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, HumanDeverlopment>
     */
    public function getHumanDeverlopmentCreate(): Collection
    {
        return $this->humanDeverlopmentCreate;
    }

    public function addHumanDeverlopmentCreate(HumanDeverlopment $humanDeverlopmentCreate): static
    {
        if (!$this->humanDeverlopmentCreate->contains($humanDeverlopmentCreate)) {
            $this->humanDeverlopmentCreate->add($humanDeverlopmentCreate);
            $humanDeverlopmentCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removeHumanDeverlopmentCreate(HumanDeverlopment $humanDeverlopmentCreate): static
    {
        if ($this->humanDeverlopmentCreate->removeElement($humanDeverlopmentCreate)) {
            // set the owning side to null (unless already changed)
            if ($humanDeverlopmentCreate->getUserCreate() === $this) {
                $humanDeverlopmentCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, HumanDeverlopment>
     */
    public function getHumanDeverlopmentUpdate(): Collection
    {
        return $this->humanDeverlopmentUpdate;
    }

    public function addHumanDeverlopmentUpdate(HumanDeverlopment $humanDeverlopmentUpdate): static
    {
        if (!$this->humanDeverlopmentUpdate->contains($humanDeverlopmentUpdate)) {
            $this->humanDeverlopmentUpdate->add($humanDeverlopmentUpdate);
            $humanDeverlopmentUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removeHumanDeverlopmentUpdate(HumanDeverlopment $humanDeverlopmentUpdate): static
    {
        if ($this->humanDeverlopmentUpdate->removeElement($humanDeverlopmentUpdate)) {
            // set the owning side to null (unless already changed)
            if ($humanDeverlopmentUpdate->getUserUpdate() === $this) {
                $humanDeverlopmentUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Economic>
     */
    public function getEconomicCreate(): Collection
    {
        return $this->economicCreate;
    }

    public function addEconomicCreate(Economic $economicCreate): static
    {
        if (!$this->economicCreate->contains($economicCreate)) {
            $this->economicCreate->add($economicCreate);
            $economicCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removeEconomicCreate(Economic $economicCreate): static
    {
        if ($this->economicCreate->removeElement($economicCreate)) {
            // set the owning side to null (unless already changed)
            if ($economicCreate->getUserCreate() === $this) {
                $economicCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Economic>
     */
    public function getEconomicUpdate(): Collection
    {
        return $this->economicUpdate;
    }

    public function addEconomicUpdate(Economic $economicUpdate): static
    {
        if (!$this->economicUpdate->contains($economicUpdate)) {
            $this->economicUpdate->add($economicUpdate);
            $economicUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removeEconomicUpdate(Economic $economicUpdate): static
    {
        if ($this->economicUpdate->removeElement($economicUpdate)) {
            // set the owning side to null (unless already changed)
            if ($economicUpdate->getUserUpdate() === $this) {
                $economicUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Environment>
     */
    public function getEnvironmentCreate(): Collection
    {
        return $this->environmentCreate;
    }

    public function addEnvironmentCreate(Environment $environmentCreate): static
    {
        if (!$this->environmentCreate->contains($environmentCreate)) {
            $this->environmentCreate->add($environmentCreate);
            $environmentCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removeEnvironmentCreate(Environment $environmentCreate): static
    {
        if ($this->environmentCreate->removeElement($environmentCreate)) {
            // set the owning side to null (unless already changed)
            if ($environmentCreate->getUserCreate() === $this) {
                $environmentCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Environment>
     */
    public function getEnvironmentUpdate(): Collection
    {
        return $this->environmentUpdate;
    }

    public function addEnvironmentUpdate(Environment $environmentUpdate): static
    {
        if (!$this->environmentUpdate->contains($environmentUpdate)) {
            $this->environmentUpdate->add($environmentUpdate);
            $environmentUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removeEnvironmentUpdate(Environment $environmentUpdate): static
    {
        if ($this->environmentUpdate->removeElement($environmentUpdate)) {
            // set the owning side to null (unless already changed)
            if ($environmentUpdate->getUserUpdate() === $this) {
                $environmentUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Peace>
     */
    public function getPeaceCreate(): Collection
    {
        return $this->peaceCreate;
    }

    public function addPeaceCreate(Peace $peaceCreate): static
    {
        if (!$this->peaceCreate->contains($peaceCreate)) {
            $this->peaceCreate->add($peaceCreate);
            $peaceCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removePeaceCreate(Peace $peaceCreate): static
    {
        if ($this->peaceCreate->removeElement($peaceCreate)) {
            // set the owning side to null (unless already changed)
            if ($peaceCreate->getUserCreate() === $this) {
                $peaceCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Peace>
     */
    public function getPeaceUpdate(): Collection
    {
        return $this->peaceUpdate;
    }

    public function addPeaceUpdate(Peace $peaceUpdate): static
    {
        if (!$this->peaceUpdate->contains($peaceUpdate)) {
            $this->peaceUpdate->add($peaceUpdate);
            $peaceUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removePeaceUpdate(Peace $peaceUpdate): static
    {
        if ($this->peaceUpdate->removeElement($peaceUpdate)) {
            // set the owning side to null (unless already changed)
            if ($peaceUpdate->getUserUpdate() === $this) {
                $peaceUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Partnership>
     */
    public function getPartnershipCreate(): Collection
    {
        return $this->partnershipCreate;
    }

    public function addPartnershipCreate(Partnership $partnershipCreate): static
    {
        if (!$this->partnershipCreate->contains($partnershipCreate)) {
            $this->partnershipCreate->add($partnershipCreate);
            $partnershipCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removePartnershipCreate(Partnership $partnershipCreate): static
    {
        if ($this->partnershipCreate->removeElement($partnershipCreate)) {
            // set the owning side to null (unless already changed)
            if ($partnershipCreate->getUserCreate() === $this) {
                $partnershipCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Partnership>
     */
    public function getPartnershipUpdate(): Collection
    {
        return $this->partnershipUpdate;
    }

    public function addPartnershipUpdate(Partnership $partnershipUpdate): static
    {
        if (!$this->partnershipUpdate->contains($partnershipUpdate)) {
            $this->partnershipUpdate->add($partnershipUpdate);
            $partnershipUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removePartnershipUpdate(Partnership $partnershipUpdate): static
    {
        if ($this->partnershipUpdate->removeElement($partnershipUpdate)) {
            // set the owning side to null (unless already changed)
            if ($partnershipUpdate->getUserUpdate() === $this) {
                $partnershipUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Stability>
     */
    public function getStabilityCreate(): Collection
    {
        return $this->stabilityCreate;
    }

    public function addStabilityCreate(Stability $stabilityCreate): static
    {
        if (!$this->stabilityCreate->contains($stabilityCreate)) {
            $this->stabilityCreate->add($stabilityCreate);
            $stabilityCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removeStabilityCreate(Stability $stabilityCreate): static
    {
        if ($this->stabilityCreate->removeElement($stabilityCreate)) {
            // set the owning side to null (unless already changed)
            if ($stabilityCreate->getUserCreate() === $this) {
                $stabilityCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Stability>
     */
    public function getStabilityUpdate(): Collection
    {
        return $this->stabilityUpdate;
    }

    public function addStabilityUpdate(Stability $stabilityUpdate): static
    {
        if (!$this->stabilityUpdate->contains($stabilityUpdate)) {
            $this->stabilityUpdate->add($stabilityUpdate);
            $stabilityUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removeStabilityUpdate(Stability $stabilityUpdate): static
    {
        if ($this->stabilityUpdate->removeElement($stabilityUpdate)) {
            // set the owning side to null (unless already changed)
            if ($stabilityUpdate->getUserUpdate() === $this) {
                $stabilityUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Escape>
     */
    public function getEscapeCreate(): Collection
    {
        return $this->escapeCreate;
    }

    public function addEscapeCreate(Escape $escapeCreate): static
    {
        if (!$this->escapeCreate->contains($escapeCreate)) {
            $this->escapeCreate->add($escapeCreate);
            $escapeCreate->setUserCreate($this);
        }

        return $this;
    }

    public function removeEscapeCreate(Escape $escapeCreate): static
    {
        if ($this->escapeCreate->removeElement($escapeCreate)) {
            // set the owning side to null (unless already changed)
            if ($escapeCreate->getUserCreate() === $this) {
                $escapeCreate->setUserCreate(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Escape>
     */
    public function getEscapeUpdate(): Collection
    {
        return $this->escapeUpdate;
    }

    public function addEscapeUpdate(Escape $escapeUpdate): static
    {
        if (!$this->escapeUpdate->contains($escapeUpdate)) {
            $this->escapeUpdate->add($escapeUpdate);
            $escapeUpdate->setUserUpdate($this);
        }

        return $this;
    }

    public function removeEscapeUpdate(Escape $escapeUpdate): static
    {
        if ($this->escapeUpdate->removeElement($escapeUpdate)) {
            // set the owning side to null (unless already changed)
            if ($escapeUpdate->getUserUpdate() === $this) {
                $escapeUpdate->setUserUpdate(null);
            }
        }

        return $this;
    }

}
