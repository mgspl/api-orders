{
  description = "Basic NodeJS Shell, Powered by github:the-nix-way/dev-templates";

  inputs.nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1"; # unstable Nixpkgs

  outputs = {self, ...} @ inputs: let
    supportedSystems = [
      "x86_64-linux"
    ];
    forEachSupportedSystem = f:
      inputs.nixpkgs.lib.genAttrs supportedSystems (
        system:
          f {
            pkgs = import inputs.nixpkgs {
              inherit system;
              overlays = [inputs.self.overlays.default];
            };
          }
      );
  in {
    overlays.default = final: prev: rec {
      nodejs = prev.nodejs;
    };

    devShells = forEachSupportedSystem (
      {pkgs}: {
        default = pkgs.mkShellNoCC {
          packages = with pkgs; [
            node2nix
            nodejs
            podman
          ];
        };
      }
    );
  };
}
