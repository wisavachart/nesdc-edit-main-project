<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240224145417 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE poor_people (id INT IDENTITY NOT NULL, province_id INT, user_create_id INT, user_update_id INT, factor_id INT, year NVARCHAR(255), gpp NUMERIC(11, 4), value NUMERIC(13, 6), date_create DATETIME2(6), date_update DATETIME2(6), is_enabled BIT, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_94AF36A1E946114A ON poor_people (province_id)');
        $this->addSql('CREATE INDEX IDX_94AF36A1EEFE5067 ON poor_people (user_create_id)');
        $this->addSql('CREATE INDEX IDX_94AF36A1D5766755 ON poor_people (user_update_id)');
        $this->addSql('CREATE INDEX IDX_94AF36A1BC88C1A3 ON poor_people (factor_id)');
        $this->addSql('ALTER TABLE poor_people ADD CONSTRAINT FK_94AF36A1E946114A FOREIGN KEY (province_id) REFERENCES provinces (id)');
        $this->addSql('ALTER TABLE poor_people ADD CONSTRAINT FK_94AF36A1EEFE5067 FOREIGN KEY (user_create_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE poor_people ADD CONSTRAINT FK_94AF36A1D5766755 FOREIGN KEY (user_update_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE poor_people ADD CONSTRAINT FK_94AF36A1BC88C1A3 FOREIGN KEY (factor_id) REFERENCES factors (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE poor_people');
    }
}
