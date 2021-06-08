package l5r.mass.battle.tracker.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Cohort implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NotNull
    private String name;

    @NotNull
    @OneToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "cohort")
    private Character leader;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name= "ARMY_ID")
    private Army army;
}
