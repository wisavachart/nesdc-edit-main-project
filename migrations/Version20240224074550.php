<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240224074550 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE factors (id INT IDENTITY NOT NULL, factor_name NVARCHAR(500), PRIMARY KEY (id))');
        $this->addSql('CREATE TABLE houses (id INT IDENTITY NOT NULL, province_id INT, user_create_id INT, user_update_id INT, year NVARCHAR(255), value DOUBLE PRECISION, date_create DATETIME2(6), date_update DATETIME2(6), is_enabled BIT, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_95D7F5CBE946114A ON houses (province_id)');
        $this->addSql('CREATE INDEX IDX_95D7F5CBEEFE5067 ON houses (user_create_id)');
        $this->addSql('CREATE INDEX IDX_95D7F5CBD5766755 ON houses (user_update_id)');
        $this->addSql('ALTER TABLE houses ADD CONSTRAINT FK_95D7F5CBE946114A FOREIGN KEY (province_id) REFERENCES provinces (id)');
        $this->addSql('ALTER TABLE houses ADD CONSTRAINT FK_95D7F5CBEEFE5067 FOREIGN KEY (user_create_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE houses ADD CONSTRAINT FK_95D7F5CBD5766755 FOREIGN KEY (user_update_id) REFERENCES users (id)');
        $this->addSql('sp_rename \'population.population\', \'value\', \'COLUMN\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE factors');
        $this->addSql('DROP TABLE houses');
        $this->addSql('sp_rename \'population.value\', \'population\', \'COLUMN\'');
    }
}
