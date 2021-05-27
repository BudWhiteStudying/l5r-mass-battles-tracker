package l5r.mass.battle.tracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Character implements Serializable {
    @NotNull
    private String name;
    @NotNull
    private String clan;
}
