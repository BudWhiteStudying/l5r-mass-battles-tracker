package l5r.mass.battle.tracker.dao;

import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;
import org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy;

import java.util.Optional;

public class UppercasePhysicalNamingStrategy extends SpringPhysicalNamingStrategy {

    @Override
    public Identifier toPhysicalCatalogName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return Optional
                .ofNullable(super.toPhysicalCatalogName(name, jdbcEnvironment))
                .map(
                        springIdentifier -> Identifier.toIdentifier(springIdentifier.getText().toUpperCase()))
                .orElse(null);
    }

    @Override
    public Identifier toPhysicalSchemaName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return Optional
                .ofNullable(super.toPhysicalSchemaName(name, jdbcEnvironment))
                .map(
                        springIdentifier -> Identifier.toIdentifier(springIdentifier.getText().toUpperCase()))
                .orElse(null);
    }

    @Override
    public Identifier toPhysicalTableName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return Optional
                .ofNullable(super.toPhysicalTableName(name, jdbcEnvironment))
                .map(
                        springIdentifier -> Identifier.toIdentifier(springIdentifier.getText().toUpperCase()))
                .orElse(null);
    }

    @Override
    public Identifier toPhysicalSequenceName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return Optional
                .ofNullable(super.toPhysicalSequenceName(name, jdbcEnvironment))
                .map(
                        springIdentifier -> Identifier.toIdentifier(springIdentifier.getText().toUpperCase()))
                .orElse(null);
    }

    @Override
    public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return Optional
                .ofNullable(super.toPhysicalColumnName(name, jdbcEnvironment))
                .map(
                        springIdentifier -> Identifier.toIdentifier(springIdentifier.getText().toUpperCase()))
                .orElse(null);
    }
}
