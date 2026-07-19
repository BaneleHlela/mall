# Asset locations (Google Cloud Storage)

All uploaded images and generated screenshots live in one GCS bucket, referenced via `backend/config/gcsClient.js`:

```js
storage.bucket("the-mall-uploads-giza")
```

Public URLs are built as `https://storage.googleapis.com/the-mall-uploads-giza/{path}` — there's no CDN/signed-URL layer in front of it, paths are constructed directly in controllers and returned/stored as full public URLs.

## Path structure (confirmed from controller code)

| Path pattern | Used for | Source |
|---|---|---|
| `mall/posters/homePoster-{timestamp}.png` | Platform-wide home poster screenshots | `createHomePoster.js` |
| `stores/{storeId}/products/{productSlug}/{imageFileName}` | Product images | `ProductController.js` |
| `stores/{storeId}/services/{slug}/{imageFileName}` | Service images | `ServiceContoller.js` |
| `stores/{storeId}/rentals/{slug}/{imageFileName}` | Rental listing images | `RentalController.js` |
| `stores/{storeId}/donations/{slug}/{imageFileName}` | Donation listing images | `DonationController.js` |
| `stores/{storeId}/posters/{posterId}/desktop.png` \| `tablet.png` \| `mobile_{n}.png` \| `poster_view.png` | Store poster renders (per-device screenshots) | `PosterContoller.js` |
| `stores/{storeSlug}/logo/{timestamp}_{fileName}` | Store logo | `StoreController.js` |
| `stores/{storeSlug}/images/{fileName}` | General store gallery images | `StoreController.js` |
| `stores/{storeSlug}/team/{imageFileName}` | Team member photos | `StoreController.js` |
| `stores/{storeSlug}/thumbnails/{thumbnailType}/{timestamp}_{fileName}` | Store thumbnails (general) | `StoreController.js` |
| `stores/{storeSlug}/thumbnails/storeCard/{timestamp}_storeCard.png` | Store card thumbnail | `StoreController.js` |
| `stores/{storeSlug}/thumbnails/reely/{timestamp}_reely.png` | "Reely" (reel-style) thumbnail | `StoreController.js` |
| `users/{username}/avatar/{fileName}` | User avatars | `UserController.js` |
| Layout screenshot paths (mobile/desktop) | Store layout section screenshots | `SectionController.js`, `StoreLayoutController.js`, `controllers/initialize/captureLayoutSections.js` |

## Known inconsistency

Most controllers key store asset paths by `store.slug` (readable, e.g. `stores/tote-bags/logo/...`). A few older one-off initialization scripts (`initializeStoreThumbnails.js`) instead key by raw `store._id`, producing `stores/{ObjectId}/thumbnails/...` paths that don't match the slug-based convention used everywhere else. Not consolidated — worth being aware of if writing anything that lists or migrates assets by prefix.

## Deletion pattern

Old files are deleted by splitting the stored public URL on `"the-mall-uploads-giza/"` to recover the bucket-relative path, then `uploadsBucket.file(path).delete()`. This pattern is repeated across most controllers rather than centralized in a shared helper.
