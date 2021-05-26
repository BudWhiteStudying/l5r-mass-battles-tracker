package l5r.mass.battle.tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "l5r.mass.battle.tracker")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
