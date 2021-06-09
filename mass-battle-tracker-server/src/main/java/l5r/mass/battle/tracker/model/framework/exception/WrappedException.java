package l5r.mass.battle.tracker.model.framework.exception;

public class WrappedException extends RuntimeException {
    final Throwable cause;

    public WrappedException(Throwable cause) { this.cause = cause; }

     public static WrappedException throwWrapped(Throwable t) {
        throw new WrappedException(t);
    }
}



