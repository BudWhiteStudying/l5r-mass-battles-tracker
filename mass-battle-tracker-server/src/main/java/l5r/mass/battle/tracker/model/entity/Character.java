package l5r.mass.battle.tracker.model.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import l5r.mass.battle.tracker.model.framework.CharacterType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "characterType", visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = Commander.class, name = CharacterType.Values.COMMANDER),
        @JsonSubTypes.Type(value = Character.class, name = CharacterType.Values.LEADER)})
//@Inheritance(strategy = InheritanceType.JOINED)
public class Character implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NotNull
    private String name;
    @NotNull
    private String clan;

    private CharacterType characterType;

    private Long armyId;
    private Long cohortId;
}
