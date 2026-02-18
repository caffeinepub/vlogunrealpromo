import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types
  type ReferenceId = Nat;

  type PromoVideo = {
    referenceId : ReferenceId;
    title : Text;
    description : Text;
    url : Text;
    thumbnailUrl : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  // Data stores
  let portfolioItems = Map.empty<ReferenceId, PromoVideo>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Portfolio Administration (admin-only operations)
  public shared ({ caller }) func createPortfolioItem(referenceId : ReferenceId, title : Text, description : Text, url : Text, thumbnailUrl : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create portfolio items");
    };

    if (portfolioItems.containsKey(referenceId)) {
      Runtime.trap("Portfolio item with this referenceId already exists!");
    };

    let newPortfolioItem : PromoVideo = {
      referenceId;
      title;
      description;
      url;
      thumbnailUrl;
    };

    portfolioItems.add(referenceId, newPortfolioItem);
  };

  public shared ({ caller }) func updatePortfolioItem(referenceId : ReferenceId, title : Text, description : Text, url : Text, thumbnailUrl : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update portfolio items");
    };

    switch (portfolioItems.get(referenceId)) {
      case (null) { Runtime.trap("Portfolio item with this referenceId does not exist!") };
      case (?_) {
        let updatedPortfolioItem : PromoVideo = {
          referenceId;
          title;
          description;
          url;
          thumbnailUrl;
        };

        portfolioItems.add(referenceId, updatedPortfolioItem);
      };
    };
  };

  public shared ({ caller }) func deletePortfolioItem(referenceId : ReferenceId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete portfolio items");
    };

    if (not portfolioItems.containsKey(referenceId)) {
      Runtime.trap("Portfolio item with this referenceId does not exist!");
    };

    portfolioItems.remove(referenceId);
  };

  // Query the full portfolio list (public access - no auth required)
  public query func getPortfolio() : async [PromoVideo] {
    portfolioItems.values().toArray().sort(
      func(a, b) {
        Nat.compare(a.referenceId, b.referenceId);
      }
    );
  };

  // Query single portfolio item (public access - no auth required)
  public query func getPortfolioItem(referenceId : ReferenceId) : async ?PromoVideo {
    portfolioItems.get(referenceId);
  };
};

