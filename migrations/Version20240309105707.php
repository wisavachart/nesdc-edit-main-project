<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240309105707 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE stability (id INT IDENTITY NOT NULL, province_id INT, factor_id INT, sub_factor_id INT, user_create_id INT, user_update_id INT, year NVARCHAR(255), value1 DOUBLE PRECISION, value2 DOUBLE PRECISION, value3 DOUBLE PRECISION, value4 DOUBLE PRECISION, value5 DOUBLE PRECISION, date_create DATETIME2(6), date_update DATETIME2(6), PRIMARY KEY (id))');
        $this->addSql('CREATE INDEX IDX_AF9E4596E946114A ON stability (province_id)');
        $this->addSql('CREATE INDEX IDX_AF9E4596BC88C1A3 ON stability (factor_id)');
        $this->addSql('CREATE INDEX IDX_AF9E4596AE85871D ON stability (sub_factor_id)');
        $this->addSql('CREATE INDEX IDX_AF9E4596EEFE5067 ON stability (user_create_id)');
        $this->addSql('CREATE INDEX IDX_AF9E4596D5766755 ON stability (user_update_id)');
        $this->addSql('ALTER TABLE stability ADD CONSTRAINT FK_AF9E4596E946114A FOREIGN KEY (province_id) REFERENCES provinces (id)');
        $this->addSql('ALTER TABLE stability ADD CONSTRAINT FK_AF9E4596BC88C1A3 FOREIGN KEY (factor_id) REFERENCES factors (id)');
        $this->addSql('ALTER TABLE stability ADD CONSTRAINT FK_AF9E4596AE85871D FOREIGN KEY (sub_factor_id) REFERENCES factors (id)');
        $this->addSql('ALTER TABLE stability ADD CONSTRAINT FK_AF9E4596EEFE5067 FOREIGN KEY (user_create_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE stability ADD CONSTRAINT FK_AF9E4596D5766755 FOREIGN KEY (user_update_id) REFERENCES users (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE stability');
    }
}
