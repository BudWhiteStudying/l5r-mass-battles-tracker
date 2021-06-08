package l5r.mass.battle.tracker.controller;

public class ResourcePaths {
    public static class Api {
        private Api(){}

        public static final String BASE = "/api";

        public static final String BATTLE = "/battle";
        public static final String ALL_BATTLES = "/all-battles";
    }
    public static class Admin {
        private Admin(){}

        public static final String BASE = "/admin";
        
        public static final String ALL_ARMIES = "/all-armies";
        public static final String ALL_BATTLES = "/all-battles";
        public static final String ALL_CHARACTERS = "/all-characters";
        public static final String ALL_ACTIONS = "/all-actions";
        public static final String ALL_OBJECTIVES = "/all-objectives";

        public static final String ARMY = "/army";
        public static final String BATTLE = "/battle";
        public static final String CHARACTER = "/character";
        public static final String ACTION = "/action";
        public static final String OBJECTIVE = "/objective";
    }
}
