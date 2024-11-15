<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240220155100 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE population DROP CONSTRAINT FK_B449A008D72A0A7A');
        $this->addSql('
                        IF EXISTS (SELECT * FROM sysobjects WHERE name = \'IDX_B449A008D72A0A7A\')
                            ALTER TABLE population DROP CONSTRAINT IDX_B449A008D72A0A7A
                        ELSE
                            DROP INDEX IDX_B449A008D72A0A7A ON population
                    ');
        $this->addSql('sp_rename \'population.province_id_id\', \'province_id\', \'COLUMN\'');
        $this->addSql('ALTER TABLE population ADD CONSTRAINT FK_B449A008E946114A FOREIGN KEY (province_id) REFERENCES provinces (id)');
        $this->addSql('CREATE INDEX IDX_B449A008E946114A ON population (province_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE population DROP CONSTRAINT FK_B449A008E946114A');
        $this->addSql('
                        IF EXISTS (SELECT * FROM sysobjects WHERE name = \'IDX_B449A008E946114A\')
                            ALTER TABLE population DROP CONSTRAINT IDX_B449A008E946114A
                        ELSE
                            DROP INDEX IDX_B449A008E946114A ON population
                    ');
        $this->addSql('sp_rename \'population.province_id\', \'province_id_id\', \'COLUMN\'');
        $this->addSql('ALTER TABLE population ADD CONSTRAINT FK_B449A008D72A0A7A FOREIGN KEY (province_id_id) REFERENCES provinces (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE NONCLUSTERED INDEX IDX_B449A008D72A0A7A ON population (province_id_id)');
    }
}
