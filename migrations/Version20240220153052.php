<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240220153052 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE population (id INT IDENTITY NOT NULL, province_id_id INT, year NVARCHAR(255), population DOUBLE PRECISION, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_B449A008D72A0A7A ON population (province_id_id)');
        $this->addSql('ALTER TABLE population ADD CONSTRAINT FK_B449A008D72A0A7A FOREIGN KEY (province_id_id) REFERENCES provinces (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE population');
    }
}
