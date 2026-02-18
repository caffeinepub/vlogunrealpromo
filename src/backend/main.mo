import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type ReferenceId = Nat;
  type PromoVideoRequest = {
    referenceId : ReferenceId;
    title : Text;
    description : Text;
    url : Text;
  };

  module PromoVideoRequest {
    public func compare(request1 : PromoVideoRequest, request2 : PromoVideoRequest) : Order.Order {
      Nat.compare(request1.referenceId, request2.referenceId);
    };
  };

  let requests = Map.empty<ReferenceId, PromoVideoRequest>();

  public shared ({ caller }) func createPromoVideoRequest(referenceId : ReferenceId, title : Text, description : Text, url : Text) : async () {
    if (requests.containsKey(referenceId)) { Runtime.trap("Promo Video Request with this referenceId already exists!") };
    let request : PromoVideoRequest = {
      referenceId;
      title;
      description;
      url;
    };
    requests.add(referenceId, request);
  };

  public query ({ caller }) func getPromoVideoRequest(referenceId : ReferenceId) : async PromoVideoRequest {
    switch (requests.get(referenceId)) {
      case (null) { Runtime.trap("Promo Video Request with this referenceId does not exist!") };
      case (?request) { request };
    };
  };

  public query ({ caller }) func getAllPromoVideoRequests() : async [PromoVideoRequest] {
    requests.values().toArray().sort();
  };
};
