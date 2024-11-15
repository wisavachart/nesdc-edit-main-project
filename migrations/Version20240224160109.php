<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240224160109 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE peace (id INT IDENTITY NOT NULL, factor_id INT, province_id INT, user_create_id INT, user_update_id INT, year NVARCHAR(255), value DOUBLE PRECISION, date_create DATETIME2(6), date_update DATETIME2(6), is_enabled BIT, PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_9151C47BC88C1A3 ON peace (factor_id)');
        $this->addSql('CREATE INDEX IDX_9151C47E946114A ON peace (province_id)');
        $this->addSql('CREATE INDEX IDX_9151C47EEFE5067 ON peace (user_create_id)');
        $this->addSql('CREATE INDEX IDX_9151C47D5766755 ON peace (user_update_id)');
        $this->addSql('ALTER TABLE peace ADD CONSTRAINT FK_9151C47BC88C1A3 FOREIGN KEY (factor_id) REFERENCES factors (id)');
        $this->addSql('ALTER TABLE peace ADD CONSTRAINT FK_9151C47E946114A FOREIGN KEY (province_id) REFERENCES provinces (id)');
        $this->addSql('ALTER TABLE peace ADD CONSTRAINT FK_9151C47EEFE5067 FOREIGN KEY (user_create_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE peace ADD CONSTRAINT FK_9151C47D5766755 FOREIGN KEY (user_update_id) REFERENCES users (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE peace');
    }
}
