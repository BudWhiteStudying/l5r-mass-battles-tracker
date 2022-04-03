package l5r.mass.battle.tracker.model.framework;

public enum CharacterType {
    LEADER(Values.LEADER),
    COMMANDER(Values.COMMANDER);

    CharacterType(String typeName) {}

    public static class Values {
        private Values(){}

        public static final String LEADER = "LEADER";
        public static final String COMMANDER = "COMMANDER";
    }
}
