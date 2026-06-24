import { useState, useCallback, useEffect } from "react";

// The AI Studio Preview environment injects this interface into the window object
// when the user has approved OAuth scopes via the UI.
interface WorkspaceWindow extends Window {
  geckoPlatform?: {
    getOAuthToken: (scopes: string[]) => Promise<{
      token: string;
      expiresAt: number; // Unix timestamp in seconds
    }>;
  };
}

export function useGoogleAuth(scopes: string[]) {
  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scopesString = scopes.join(',');

  const getValidToken = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const geckoWindow = window as unknown as WorkspaceWindow;

      if (!geckoWindow.geckoPlatform?.getOAuthToken) {
        throw new Error(
          "OAuth interface is not available. Ensure you are running in the AI Studio Preview environment and have configured the OAuth credentials securely."
        );
      }

      // Check if we have a valid token (adding a 5-minute buffer)
      if (!forceRefresh && token && expiresAt && Date.now() / 1000 < expiresAt - 300) {
        return token;
      }

      const response = await geckoWindow.geckoPlatform.getOAuthToken(scopes);

      setToken(response.token);
      setExpiresAt(response.expiresAt);
      return response.token;
    } catch (err) {
      const authError = err instanceof Error ? err : new Error(String(err));
      setError(authError);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  }, [scopesString, token, expiresAt]);

  // Optionally auto-fetch on mount
  useEffect(() => {
    getValidToken().catch(() => {
      // Ignore initial auto-fetch errors, let the user trigger it manually if needed
    });
  }, [getValidToken]);

  return { getValidToken, token, error, isLoading };
}
